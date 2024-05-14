package com.huyu.user.controller;

import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.UserLogin;
import com.huyu.model.personal.vos.UserRegister;
import com.huyu.user.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/personal")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/login")
    @ApiOperation("用户登录")
    public ResponseEntity<ResponseResult> login(@RequestBody UserLogin params) {
        return userService.login(params);
    }

    @PostMapping("/register")
    @ApiOperation("用户注册")
    public ResponseResult register(@RequestBody UserRegister params) {
        return userService.register(params);
    }

    @PostMapping("/login_yq")
    @ApiOperation("用户登录")
    public ResponseEntity<ResponseResult> login_yq(@RequestBody UserLogin params) {
        return userService.login_yq(params);
    }

    @GetMapping("/getToken")
    @ApiOperation("获取 token")
    public ResponseEntity getToken() {
        return userService.getToken();
    }

    @GetMapping("/getUserInfo")
    @ApiOperation("获取用户详情")
    public ResponseEntity<ResponseResult> getUserInfo(Integer id) {
        return userService.getUserInfo(id);
    }

    @GetMapping("/getUserList")
    @ApiOperation("获取用户列表")
    public ResponseEntity getData(
            @RequestParam(defaultValue = "1", value = "page") int page,
            @RequestParam(defaultValue = "10", value = "pageSize") int pageSize,
            String username,
            String phone,
            Integer sex,
            // 0 正常 1 锁定
            Integer status,

            // 0 普通用户 1 vip
            Integer flag
    ) {
        return userService.getTableData(page, pageSize, username, phone, sex, status, flag);
    }

    @PostMapping("/setUserInfo")
    @ApiOperation("修改用户详情")
    public ResponseEntity<ResponseResult> setUserInfo(@RequestBody User user) {
        return userService.setUserInfo(user);
    }

    @DeleteMapping("/delUser")
    @ApiOperation("删除用户")
    public ResponseEntity<ResponseResult> delUser(@RequestBody Map map) {
        List ids = (List) map.get("ids");
        return userService.delUser(ids);
    }
}
