package com.huyu.model.personal.vos;

import lombok.Data;

import java.util.Date;

@Data
public class UserRegister extends UserLogin {
    private String phone;
    private Date createdTime;
}
