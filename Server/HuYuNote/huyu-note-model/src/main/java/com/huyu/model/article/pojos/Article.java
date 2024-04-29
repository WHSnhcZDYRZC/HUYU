package com.huyu.model.article.pojos;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.huyu.model.common.pojos.BasePojo;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 文章信息表，存储已发布的文章
 * </p>
 *
 * @author itheima
 */

@Data
@TableName("huyu_article")
public class Article extends BasePojo {

    @TableId(value = "id")
    private Long id;

    /**
     * 标题
     */
    private String title;

    /**
     * 作者id
     */
    @TableField("user_id")
    private Long userId;

    /**
     * 作者名称
     */
    @TableField("user_name")
    private String userName;

    /**
     * 前端路由路径
     */
    @TableField("router_path")
    private String routerPath;


    /**
     * 文章状态 0 删除 1 正常
     */
    @TableField("article_status")
    private Integer articleStatus;

    /**
     * 文章编辑次数
     */
    @TableField("edit_times")
    private Integer editTimes;
}
