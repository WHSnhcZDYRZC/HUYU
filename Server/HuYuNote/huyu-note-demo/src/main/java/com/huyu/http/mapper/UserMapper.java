package com.huyu.http.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.huyu.model.personal.pojos.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
