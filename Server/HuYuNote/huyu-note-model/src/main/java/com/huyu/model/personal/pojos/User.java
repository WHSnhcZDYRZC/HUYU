package com.huyu.model.personal.pojos;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.huyu.model.common.pojos.BasePojo;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * 用户信息表
 *
 * @author huyu
 */
@Data
@TableName("huyu_user")
public class User extends BasePojo {
    @TableId(value = "id", type = IdType.AUTO)
    private long id;

    /**
     * 密码、通信等加密盐
     */
    @TableField(value = "salt", exist = false)
    private String salt;

    /**
     * 用户名
     */
    @TableField("username")
    private String username;

    /**
     * 密码,md5加密
     */
    @TableField(value = "password")
    private String password;

    /**
     * 手机号
     */
    @TableField("phone")
    private String phone;

    /**
     * 头像
     */
    @TableField("image")
    private String image;

    /**
     * 0 男
     * 1 女
     * 2 未知
     */
    @TableField("sex")
    private short sex;


    /**
     * 0正常
     * 1锁定
     */
    @TableField("status")
    private Boolean status;

    /**
     * 0 普通用户
     * 1 vip
     */
    @TableField("flag")
    private Short flag;
}