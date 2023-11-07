package com.huyu.model.personal.vos;

import lombok.Data;

import java.util.Date;

@Data
public class UserRegister extends UserLogin {
    private Date createdTime;
}
