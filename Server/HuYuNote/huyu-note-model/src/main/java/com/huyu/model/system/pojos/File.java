package com.huyu.model.system.pojos;

import com.baomidou.mybatisplus.annotation.*;
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

    @TableField(value = "user_id", fill = FieldFill.INSERT)
    private Integer userId;

    @TableField(value = "created_time", fill = FieldFill.INSERT)
    private Date createdTime;

    @TableField("updated_time")
    private Date updatedTime;
}
