package com.huyu.article.handler;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class MyMetaObjectHandler implements MetaObjectHandler {

    @Override
    public void insertFill(MetaObject metaObject) {
        Object created = getFieldValByName("created_time", metaObject);
        if (null == created) {
            //字段为空，可以进行填充
            setFieldValByName("created_time", new Date(), metaObject);
        }

        Object updated = getFieldValByName("updated_time", metaObject);
        if (null == updated) {
            //字段为空，可以进行填充
            setFieldValByName("updated_time", new Date(), metaObject);
        }
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        //更新数据时，直接更新字段
        setFieldValByName("updated_time", new Date(), metaObject);
    }
}