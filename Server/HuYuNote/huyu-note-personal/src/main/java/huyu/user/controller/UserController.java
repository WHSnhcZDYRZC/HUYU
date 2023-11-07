package huyu.user.controller;

import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.vos.UserLogin;
import huyu.user.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseResult register(@RequestBody UserLogin params) {
        return userService.register(params);
    }

    @GetMapping("/getUserInfo")
    @ApiOperation("获取用户详情")
    public ResponseEntity<ResponseResult> getUserInfo() {
        return userService.getUserInfo();
    }
}
