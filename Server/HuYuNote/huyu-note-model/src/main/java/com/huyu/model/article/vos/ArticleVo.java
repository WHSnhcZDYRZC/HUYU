package com.huyu.model.article.vos;

import com.huyu.model.article.pojos.Article;
import lombok.Data;

@Data
public class ArticleVo extends Article {
    /**
     * 文章内容
     */
    private String articleContent;

    /**
     *  文章内容图片
     */
    private String[] imagesUrl;
}
