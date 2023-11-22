package com.huyu.model.system.vos;

import lombok.Data;

@Data
public class FileSimple {
    private String fileName;
    private String fileHash;
    private String fileSize;
}
