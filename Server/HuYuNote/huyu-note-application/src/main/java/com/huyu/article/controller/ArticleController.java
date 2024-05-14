package com.huyu.article.controller;

import com.alibaba.fastjson.JSON;
import com.huyu.article.service.ArticleService;
import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.article.vos.SearchArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import org.apache.ibatis.annotations.Param;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Date;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    ArticleService articleService;

//    @Autowired
//    private RestHighLevelClient restHighLevelClient;

    @PostMapping("/saveOrUpdate")
    public ResponseEntity<ResponseResult> saveOrUpdate(@RequestBody ArticleVo params) {
        return articleService.saveOrUpdateArticle(params);
    }

    @GetMapping("/searchArticleMenu")
    public ResponseEntity<ResponseResult> searchArticleMenu(String keyWord) {
        return articleService.searchArticleMenu(keyWord);
    }

    @GetMapping("/getArticleMenu")
    public ResponseEntity<ResponseResult> getArticleMenu(User user) {
        return articleService.getArticleMenu(user);
    }

    @GetMapping("/getArticleContent/{id}")
    public ResponseEntity<ResponseResult> getArticleContent(@PathVariable("id") Long id) {
        return articleService.getArticleContent(id);
    }

    @GetMapping("/delete")
    public ResponseEntity<ResponseResult> delete(String url) {
        return articleService.delete(url);
    }
}
