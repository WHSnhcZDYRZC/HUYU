package huyu.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.UserLogin;
import org.springframework.http.ResponseEntity;

public interface UserService extends IService<User> {
    ResponseResult register(UserLogin params);

    ResponseEntity<ResponseResult> login(UserLogin params);

    ResponseEntity<ResponseResult> getUserInfo();
}
