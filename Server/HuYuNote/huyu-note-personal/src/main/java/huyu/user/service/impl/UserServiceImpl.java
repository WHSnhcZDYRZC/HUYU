package huyu.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.common.enums.AppHttpCodeEnum;
import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.UserLogin;
import huyu.user.mapper.UserMapper;
import huyu.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return ResponseResult.okResult(AppHttpCodeEnum.SUCCESS);
    }

//    @Override
//    public ResponseResult login(LoginDto params) {
//        if (StringUtils.isNotBlank(params.getPhone()) && StringUtils.isNotBlank(params.getPassword())) {
//            LambdaQueryWrapper<ApUser> queryWrapper = new LambdaQueryWrapper<>();
//            queryWrapper.eq(ApUser::getPhone, params.getPhone());
//
//            ApUser apUser = apUserMapper.selectOne(queryWrapper);
//
//            if (apUser == null) {
//                return ResponseResult.errorResult(AppHttpCodeEnum.DATA_NOT_EXIST, "用户信息不存在！");
//            }
//
//            // 严数据
//            String salt = apUser.getSalt();
//
//            // Spring 内置
//            String pwd = DigestUtils.md5DigestAsHex((params.getPassword() + salt).getBytes(StandardCharsets.UTF_8));
//            if (!pwd.equals(apUser.getPassword())) {
//                return ResponseResult.errorResult(AppHttpCodeEnum.LOGIN_PASSWORD_ERROR);
//            }
//
//            String token = AppJwtUtil.getToken(Long.valueOf(apUser.getId()));
//
//            apUser.setSalt("");
//            apUser.setPassword("");
//
//            HashMap hashMap = new HashMap();
//
//            hashMap.put("user", apUser);
//            hashMap.put("token", token);
//
//            return ResponseResult.okResult(hashMap);
//        } else {
//            HashMap<Object, Object> map = new HashMap<>();
//            map.put("token", AppJwtUtil.getToken(0L));
//
//            return ResponseResult.okResult(map);
//        }
//    }
}
