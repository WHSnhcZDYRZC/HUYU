package com.huyu.system.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import com.huy.thread.ThreadLocalUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * 公共字段自动填充处理器
 */
@Component
@Slf4j
class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        // 这是对应着 实体类 中添加了插入时注解 经过的函数
        Integer currenId = ThreadLocalUtil.getUser().getId();

        // log.info("当前的线程为：{}", Thread.currentThread().getId());
        metaObject.setValue("createdTime", new Date());
        metaObject.setValue("updatedTime", new Date());
        metaObject.setValue("userId", currenId);
//        metaObject.setValue("updateUser", currenId);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        // 这是对应着 实体类 中添加了插入时和更新时注解 经过的函数
        Integer currenId = ThreadLocalUtil.getUser().getId();

        metaObject.setValue("updatedTime", new Date());
//        metaObject.setValue("updateUser", currenId);
    }
}
