package huyu.user.interceptor;

import com.huy.thread.ThreadLocalUtil;
import com.huyu.model.personal.pojos.User;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
public class TokenInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String userId = request.getHeader("userId");
        if (StringUtils.isNotBlank(userId)) {
            User user = new User();
            user.setId(Integer.valueOf(userId));
            ThreadLocalUtil.setUser(user);
            log.info("设置 User 成功!");
        }

        return true;
    }


    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        log.info("清理 User 成功!");
        ThreadLocalUtil.clear();
    }
}
