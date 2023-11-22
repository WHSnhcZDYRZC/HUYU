package com.huyu.model.common.pojos;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public abstract class BasePojo implements Serializable {

    @TableField(fill = FieldFill.INSERT, value = "created_time") //自动填充
    private Date createdTime;
    @TableField(fill = FieldFill.INSERT_UPDATE, value = "update_time")
    private Date updatedTime;
}