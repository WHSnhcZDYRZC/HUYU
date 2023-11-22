package com.huyu.system.controller;

import com.huyu.model.system.vos.BigFileSlice;
import com.huyu.model.system.vos.FileSimple;
import com.huyu.system.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/system")
public class SystemController {
    @Autowired
    FileService fileService;

    /**
     * 图片上传
     *
     * @param files
     * @return
     */
    @PostMapping("/imageUpload")
    public ResponseEntity imageUpload(MultipartFile files[]) {
        return fileService.updateImage(files);
    }

    /***
     * 普通文件上传
     * @param file
     * @return
     */
    @PostMapping("/dataUpload")
    public ResponseEntity dataUpload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("fileHash") String fileHash
    ) {
        return fileService.dataUpload(file, fileHash);
    }

    /**
     * 文件上传前
     *
     * @param fileSimple
     * @return
     */
    @PostMapping("/beforeUpload")
    public ResponseEntity beforeUpload(@RequestBody FileSimple fileSimple) {
        return fileService.beforeUpload(fileSimple);
    }


    @PostMapping("/shardingUpload")
    public ResponseEntity shardingUpload(
            @RequestParam("fileStream") MultipartFile fileStream,
            BigFileSlice fileSlice
    ) {
        return fileService.shardingUpload(fileStream, fileSlice);
    }

    @GetMapping("/getFileList")
    public ResponseEntity getFileList() {
        return fileService.getFileList();
    }
}
