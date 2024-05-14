package com.huyu.article.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.huyu.model.article.pojos.Article;
import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import org.springframework.http.ResponseEntity;

public interface ArticleService extends IService<Article> {

    ResponseEntity<ResponseResult> saveOrUpdateArticle(ArticleVo params);

    ResponseEntity<ResponseResult> getArticleMenu(User user);

    ResponseEntity<ResponseResult> getArticleContent(Long id);

    ResponseEntity<ResponseResult> searchArticleMenu(String keyWord);

    ResponseEntity<ResponseResult> delete(String id);
}
