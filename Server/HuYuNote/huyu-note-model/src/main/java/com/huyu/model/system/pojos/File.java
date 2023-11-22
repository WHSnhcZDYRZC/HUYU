package com.huyu.model.system.pojos;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.huyu.model.common.pojos.BasePojo;
import lombok.Data;

import java.util.Date;

@Data
@TableName("huyu_files")
public class File extends BasePojo {
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    @TableField("name")
    private String name;

    @TableField("file_url")
    private String fileUrl;

    @TableField("hash")
    private String Hash;

    @TableField("user_id")
    private Integer userId;

    @TableField("created_time")
    private Date createdTime;

    @TableField("updated_time")
    private Date updatedTime;
}
