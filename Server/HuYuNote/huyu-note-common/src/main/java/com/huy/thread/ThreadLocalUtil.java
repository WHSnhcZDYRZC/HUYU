package com.huy.thread;
import com.huyu.model.personal.pojos.User;

public class ThreadLocalUtil {
    private final static ThreadLocal<User> USER_THREAD_LOCAL = new ThreadLocal<>();

    /**
     * 添加用户
     *
     * @param user
     */
    public static void setUser(User user) {
        USER_THREAD_LOCAL.set(user);
    }

    /**
     * 获取用户
     *
     * @return
     */
    public static User getUser() {
        return USER_THREAD_LOCAL.get();
    }

    /**
     * 清理用户
     *
     * @return
     */
    public static void clear() {
        USER_THREAD_LOCAL.remove();
    }
}
