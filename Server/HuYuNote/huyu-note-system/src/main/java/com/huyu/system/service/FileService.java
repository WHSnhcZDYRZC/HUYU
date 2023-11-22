package com.huyu.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.huyu.model.system.pojos.File;
import com.huyu.model.system.vos.BigFileSlice;
import com.huyu.model.system.vos.FileSimple;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface FileService extends IService<File> {
    ResponseEntity updateImage(MultipartFile[] files);

    ResponseEntity beforeUpload(FileSimple fileSimple);

    ResponseEntity dataUpload(MultipartFile file, String fileHash);

    ResponseEntity shardingUpload(MultipartFile fileStream, BigFileSlice fileSlice);

    ResponseEntity getFileList();
}
