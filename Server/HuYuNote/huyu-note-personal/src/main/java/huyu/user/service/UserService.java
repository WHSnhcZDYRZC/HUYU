package huyu.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.UserLogin;

public interface UserService extends IService<User> {
    ResponseResult register(UserLogin params);
//    ResponseResult login(LoginDto params);
}
