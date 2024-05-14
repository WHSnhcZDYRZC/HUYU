package com.huyu.user.service.impl;

import com.alibaba.cloud.commons.lang.StringUtils;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.huy.thread.ThreadLocalUtil;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.common.enums.AppHttpCodeEnum;
import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.PageResult;
import com.huyu.model.personal.vos.UserLogin;
import com.huyu.model.personal.vos.UserRegister;
import com.huyu.user.mapper.UserMapper;
import com.huyu.user.service.UserService;
import com.huyu.utils.common.AppJwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service

// 事务
@Transactional

// 日志
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    UserMapper userMapper;

    @Override
    public ResponseResult register(UserRegister params) {
        User user = new User();
        BeanUtils.copyProperties(params, user);
        String password = user.getPassword();
        user.setPassword(DigestUtils.md5DigestAsHex((password + "HuYu").getBytes(StandardCharsets.UTF_8)));
        user.setIsDelect((short) 0);

        userMapper.insert(user);
        return ResponseResult.okResult(AppHttpCodeEnum.SUCCESS);
    }

    @Override
    public ResponseEntity<ResponseResult> login(UserLogin params) {
        String code = params.getVerificationCode();
        String password = params.getPassword();
        String phone = params.getPhone();

        if ((StringUtils.isEmpty(code) && StringUtils.isEmpty(password)) || StringUtils.isEmpty(phone))
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseResult.errorResult(AppHttpCodeEnum.LOGIN_USER_ERROR));

        password = DigestUtils.md5DigestAsHex((password + "HuYu").getBytes(StandardCharsets.UTF_8));
        User user = userMapper.selectOne(new LambdaQueryWrapper<User>().eq(User::getPhone, phone).eq(User::getPassword, password));

        if (user == null)
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseResult.errorResult(AppHttpCodeEnum.LOGIN_PASSWORD_ERROR));

        String token = AppJwtUtil.getToken(Long.valueOf(user.getId()));

        return ResponseEntity.ok(ResponseResult.okResult(token));
    }

    @Override
    public ResponseEntity<ResponseResult> getUserInfo(Integer id) {
        User user;

        if (id == null) {
            user = ThreadLocalUtil.getUser();
            if (user == null)
                return ResponseEntity.status(AppHttpCodeEnum.TOKEN_EXPIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.TOKEN_EXPIRE));
        } else {
            user = new User();
            user.setId(id);
        }

        user = userMapper.selectById(user.getId());
        user.setPassword("");
        return ResponseEntity.ok(ResponseResult.okResult(user));
    }


    @Override
    public ResponseEntity getTableData(int page, int pageSize, String username, String phone, Integer sex, Integer status, Integer flag) {

        Page<User> pageData = new Page<>(page, pageSize);
        LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<>();

        if (StringUtils.isNotEmpty(username)) {
            wrapper.eq(User::getUsername, username);
        }

        if (StringUtils.isNotEmpty(phone)) {
            wrapper.eq(User::getPhone, phone);
        }

        if (sex != null && !sex.toString().isEmpty()) {
            wrapper.eq(User::getSex, sex);
        }

        if (status != null && !status.toString().isEmpty()) {
            wrapper.eq(User::getStatus, status);
        }

        if (flag != null && !flag.toString().isEmpty()) {
            wrapper.eq(User::getFlag, flag);
        }


//        wrapper.like(username != null && username != "", User::getUsername, username);
//        wrapper.like(phone != null && username != "", User::getPhone, phone);
//        wrapper.like(sex != null && username != "", User::getSex, sex);
//        wrapper.like(status != null && username != "", User::getStatus, status);
//        wrapper.like(flag != null && username != "", User::getFlag, flag);

        Page<User> dataList = userMapper.selectPage(pageData, wrapper);

        PageResult pageResult = new PageResult(page, pageSize, Math.toIntExact(pageData.getTotal()), dataList.getRecords());
        return ResponseEntity.ok(pageResult);
    }

    @Override
    public ResponseEntity<ResponseResult> setUserInfo(User user) {
        User u = userMapper.selectById(user.getId());

        if (StringUtils.isNotEmpty(user.getPassword())) {
            String password = DigestUtils.md5DigestAsHex((user.getPassword() + "HuYu").getBytes(StandardCharsets.UTF_8));
            user.setPassword(password);
        } else {
            user.setPassword(u.getPassword());
        }

        userMapper.updateById(user);
        return ResponseEntity.ok(ResponseResult.okResult(AppHttpCodeEnum.SUCCESS));
    }

    @Override
    public ResponseEntity<ResponseResult> delUser(List ids) {
        userMapper.deleteBatchIds(ids);
        return ResponseEntity.ok(ResponseResult.okResult(AppHttpCodeEnum.SUCCESS));
    }

    @Override
    public ResponseEntity getToken() {
        User user = ThreadLocalUtil.getUser();

        if (user == null) {
            return ResponseEntity.status(AppHttpCodeEnum.TOKEN_EXPIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.TOKEN_EXPIRE));
        } else {
            String token = AppJwtUtil.getToken(Long.valueOf(user.getId()));
            Map map = new HashMap();
            map.put("token", token);
            map.put("startTime", System.currentTimeMillis() + "");

            // 十天
            map.put("endTime", System.currentTimeMillis() + 864000000 + "");

            return ResponseEntity.ok(ResponseResult.okResult(map));
        }

    }

    @Override
    public ResponseEntity<ResponseResult> login_yq(UserLogin params) {
        ResponseEntity<ResponseResult> loginRes = this.login(params);
        String token = (String) loginRes.getBody().getData();

        Map map = new HashMap();
        map.put("token", token);
        map.put("startTime", System.currentTimeMillis() + "");

        // 十天
        map.put("endTime", System.currentTimeMillis() + 864000000 + "");

        return ResponseEntity.ok(ResponseResult.okResult(map));
    }
}
