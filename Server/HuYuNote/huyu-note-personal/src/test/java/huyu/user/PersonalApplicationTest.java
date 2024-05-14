package huyu.user;

import com.huyu.model.personal.pojos.User;
import com.huyu.model.personal.vos.UserRegister;
import com.huyu.user.PersonalApplication;
import com.huyu.user.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = PersonalApplication.class)
@RunWith(SpringRunner.class)
public class PersonalApplicationTest {

    @Autowired
    UserService userService;

    @Test
    public void addUser() {
        for (int i = 0; i < 100000; i++) {
            UserRegister register = new UserRegister();
            register.setPassword("123456");
            register.setUsername("用户" + i);
            register.setStatus(false);
            register.setFlag((short) 0);
            userService.register(register);
        }
    }


}
