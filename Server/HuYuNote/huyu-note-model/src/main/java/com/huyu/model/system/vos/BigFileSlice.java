package com.huyu.model.system.vos;

import lombok.Data;

@Data
public class BigFileSlice {
    private String fileName;

    /**
     * 总大小
     */
    private Long totalSize;

    /**
     * 总 hash
     */
    private String totalFileHash;

    /**
     * 此片 hash
     */
    private String fileHash;

    /**
     * 总片数
     */
    private Integer totalNum;

    /**
     * 此片数
     */
    private Integer num;

    /**
     * 起始位置
     */
    private Long startSize;
}
