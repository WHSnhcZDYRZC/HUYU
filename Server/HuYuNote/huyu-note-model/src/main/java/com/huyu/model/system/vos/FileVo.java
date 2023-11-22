package com.huyu.model.system.vos;

import lombok.Data;

@Data
public class FileVo {
    private String name;
    private String url;
    private String createdTime;
    private String updateTime;

    public FileVo(String name, String url, String createdTime, String updateTime) {
        this.name = name;
        this.url = url;
        this.createdTime = createdTime;
        this.updateTime = updateTime;
    }

    public FileVo(String name, String url) {
        this.name = name;
        this.url = url;
        this.createdTime = createdTime;
        this.updateTime = updateTime;
    }
}
