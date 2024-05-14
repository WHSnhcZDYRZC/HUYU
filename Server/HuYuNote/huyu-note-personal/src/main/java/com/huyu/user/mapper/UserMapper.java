package com.huyu.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.huyu.model.personal.pojos.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
