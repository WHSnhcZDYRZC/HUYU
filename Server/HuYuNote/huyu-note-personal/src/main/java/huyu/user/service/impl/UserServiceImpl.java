package huyu.user.service.impl;

import com.alibaba.cloud.commons.lang.StringUtils;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.huy.thread.ThreadLocalUtil;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.common.enums.AppHttpCodeEnum;
import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.UserLogin;
import com.huyu.utils.common.AppJwtUtil;
import huyu.user.mapper.UserMapper;
import huyu.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Service

// 事务
@Transactional

// 日志
@Slf4j
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    UserMapper userMapper;

    @Override
    public ResponseResult register(UserLogin params) {
        User user = new User();
        BeanUtils.copyProperties(params, user);

        userMapper.insert(user);
//        return ResponseResult.okResult(AppHttpCodeEnum.SUCCESS);
        return null;
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
    public ResponseEntity<ResponseResult> getUserInfo() {
        User user = ThreadLocalUtil.getUser();
        if (user == null)
            return ResponseEntity.status(AppHttpCodeEnum.TOKEN_EXPIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.TOKEN_EXPIRE));

        user = userMapper.selectById(user.getId());
        user.setPassword("");

        return ResponseEntity.ok(ResponseResult.okResult(user));
    }
}
