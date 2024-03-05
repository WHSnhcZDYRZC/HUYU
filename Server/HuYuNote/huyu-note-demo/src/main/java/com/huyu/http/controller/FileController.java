package com.huyu.http.controller;

import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.system.vos.FileSimple;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.huyu.system.service.FileService;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/test/file")
public class FileController {
    @Autowired
    FileService fileService;

    @PostMapping("/getJson")
    public ResponseEntity getJson(@RequestBody Map<String, String> map) {
        String smsg = map.get("message");
        System.out.println(smsg);

        return ResponseEntity.ok(ResponseResult.okResult("Hello client!"));
    }

    @GetMapping("/getFileList")
    public ResponseEntity getFileList() {
        return fileService.getFileList();
    }

    @PostMapping("/beforeUpload")
    public ResponseEntity beforeUpload(@RequestBody FileSimple fileSimple) {
        return fileService.beforeUpload(fileSimple);
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
}
