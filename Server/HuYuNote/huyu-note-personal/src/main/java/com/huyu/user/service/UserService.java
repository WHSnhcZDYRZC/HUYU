package com.huyu.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.UserLogin;
import com.huyu.model.personal.vos.UserRegister;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService extends IService<User> {
    ResponseResult register(UserRegister params);

    ResponseEntity<ResponseResult> login(UserLogin params);

    ResponseEntity<ResponseResult> getUserInfo(Integer id);

    ResponseEntity getTableData(int page, int pageSize, String username, String phone, Integer sex, Integer status,  Integer flag);

    ResponseEntity<ResponseResult> setUserInfo(User user);

    ResponseEntity<ResponseResult> delUser(List ids);

    ResponseEntity getToken();

    ResponseEntity<ResponseResult> login_yq(UserLogin params);
}
