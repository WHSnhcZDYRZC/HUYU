package com.huyu.system.service.impl;

import com.alibaba.cloud.commons.lang.StringUtils;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.huy.fileStarter.service.FileStorageService;
import com.huy.thread.ThreadLocalUtil;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.common.enums.AppHttpCodeEnum;
import com.huyu.model.system.pojos.File;
import com.huyu.model.system.vos.BigFileSlice;
import com.huyu.model.system.vos.FileSimple;
import com.huyu.model.system.vos.FileVo;
import com.huyu.system.mapper.FileMapper;
import com.huyu.system.service.FileService;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.RandomAccessFile;
import java.nio.channels.Channels;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@Transactional
@Slf4j
public class FileServiceImpl extends ServiceImpl<FileMapper, File> implements FileService {
    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    FileMapper fileMapper;

    @Autowired
    RedisTemplate<String, String> redisTemplate;

    @Value("${file.target}")
    private String filePath;

    @Value("${file.redisTarget}")
    private String redisTarget;

    @Override
    public ResponseEntity updateImage(MultipartFile[] files) {
        if (files.length == 0)
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));

        ArrayList arr = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                String fileName = file.getOriginalFilename() + System.currentTimeMillis();

                String url = fileStorageService.uploadImgFile("", fileName, file.getInputStream());
                arr.add(new FileVo(fileName, url));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(ResponseResult.okResult(arr));
    }

    @Override
    public ResponseEntity dataUpload(MultipartFile file, String fileHash) {
        if (file == null)
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));

        File fileDb = null;
        String originalFilename = file.getOriginalFilename();
        try {
            String fileUrl = fileStorageService.updateFile(file.getOriginalFilename(), file.getInputStream(), file.getContentType());

            fileDb = new File();
            fileDb.setName(originalFilename);
            fileDb.setFileUrl(fileUrl);
            fileDb.setHash(fileHash);
            fileMapper.insert(fileDb);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(ResponseResult.okFileResult(fileDb));
    }

    @Override
    public ResponseEntity beforeUpload(FileSimple fileSimple) {
        if (fileSimple == null)
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));

        File file = fileMapper.selectOne(new LambdaQueryWrapper<File>().eq(File::getHash, fileSimple.getFileHash()));
        if (file == null) {
            return ResponseEntity.status(AppHttpCodeEnum.WARN_FILE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.WARN_FILE));
        } else {
            fileMapper.updateById(file);
            return ResponseEntity.ok(ResponseResult.setAppHttpCodeEnum(AppHttpCodeEnum.SUCCESS_FILE_EXIST));
        }
    }

//    private Object obj = new Object();

    @Autowired
    RedissonClient redissonClient;

    @Override
    public ResponseEntity shardingUpload(MultipartFile fileStream, BigFileSlice fileSlice) {
        if (fileStream == null || fileSlice == null)
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));

        String redisPath = redisTarget + ":" + fileSlice.getTotalFileHash() + ':' + fileSlice.getFileHash();

        ValueOperations<String, String> ops = redisTemplate.opsForValue();

        String isExist = ops.get(redisPath);

        if (isExist != null) return ResponseEntity.ok(ResponseResult.setAppHttpCodeEnum(AppHttpCodeEnum.SUCCESS_FILE));

        String fullPath = filePath + fileSlice.getFileName();

        // 分布式锁
        RLock rLock = redissonClient.getLock("FILE_KEY");

        try {
            RandomAccessFile rf = new RandomAccessFile(fullPath, "rw");
            rf.seek(fileSlice.getStartSize());
            rf.write(fileStream.getBytes());
            rf.close();

//            Set<String> keys;

//            synchronized (obj) {
            rLock.lock();

            ops.set(redisPath, "true");
            Set<String> keys = redisTemplate.keys(redisTarget + ":" + fileSlice.getTotalFileHash() + "*");
            System.out.println(fileSlice.getTotalNum() + ":" + keys.size());
//            }

            if (fileSlice.getTotalNum().equals(keys.size())) {
                RandomAccessFile srf = new RandomAccessFile(fullPath, "rw");
                FileChannel channel = srf.getChannel();
                InputStream inputStream = Channels.newInputStream(channel);
                Path filePath = Paths.get(fullPath);
                Path fileName = filePath.getFileName();
                String contentType = Files.probeContentType(filePath);

                File file = new File();
                file.setHash(fileSlice.getTotalFileHash());
                file.setName(fileSlice.getFileName());
                file.setFileUrl(fileStorageService.updateFile(String.valueOf(fileName), inputStream, contentType));
                fileMapper.insert(file);
                srf.close();

                // 清除 redis 数据
                redisTemplate.delete(keys);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            rLock.unlock();
        }

        return ResponseEntity.ok(ResponseResult.setAppHttpCodeEnum(AppHttpCodeEnum.SUCCESS_FilE_UPLOADED));
    }

    @Override
    public ResponseEntity getFileList(String fileName, String createdTime, String endTime) {
        Integer id = ThreadLocalUtil.getUser().getId();
        System.out.println(fileName + createdTime + endTime);

        LambdaQueryWrapper<File> lqw = new LambdaQueryWrapper();
        lqw.eq(File::getUserId, id).like(fileName != null, File::getName, fileName);

        if (StringUtils.isNotEmpty(createdTime)) {
            lqw.ge(File::getCreatedTime, createdTime).le(File::getCreatedTime, endTime);
        }

        List<File> files = fileMapper.selectList(lqw);
        return ResponseEntity.ok(ResponseResult.okResult(files));
    }
}
