package com.huyu.article.service.impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.huy.fileStarter.service.FileStorageService;
import com.huy.tess4j.Tess4jClient;
import com.huy.thread.ThreadLocalUtil;
import com.huyu.article.mapper.ArticleMapper;
import com.huyu.article.service.ArticleService;
import com.huyu.model.article.pojos.Article;
import com.huyu.model.article.pojos.ArticleContent;
import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.article.vos.SearchArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.common.enums.AppHttpCodeEnum;
import com.huyu.model.personal.pojos.User;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.*;
import org.elasticsearch.index.reindex.BulkByScrollResponse;
import org.elasticsearch.index.reindex.DeleteByQueryRequest;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.Wrapper;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service

// 事务
@Transactional

// 日志
@Slf4j
public class ArticleServiceImpl extends ServiceImpl<ArticleMapper, Article> implements ArticleService {
    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    ArticleMapper articleMapper;

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    Tess4jClient tess4jClient;

    @Override
    public ResponseEntity<ResponseResult> saveOrUpdateArticle(ArticleVo params) {
        if (StringUtils.isEmpty(params.getTitle()) || StringUtils.isEmpty(params.getArticleContent())) {
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));
        }

        params.setUserId(params.getUserId());
        params.setArticleStatus(1);

        if (params.getId() == null) {
            // add
            params.setEditTimes(1);
            params.setCreatedTime(new Date());
            params.setUpdatedTime(new Date());
            this.save(params);
            ArticleContent articleContent = new ArticleContent(Long.valueOf(params.getUserId()), Long.valueOf(params.getId()), params.getArticleContent());
            mongoTemplate.save(articleContent);
        } else {
            // update
            Article article = articleMapper.selectById(params.getId());
            params.setEditTimes(article.getEditTimes() + 1);
            params.setUpdatedTime(new Date());
            this.updateById(params);
            Query query = Query.query(Criteria.where("ArticleId").is(params.getId()));
            mongoTemplate.findAndModify(query, new Update().set("ArticleContent", params.getArticleContent()), ArticleContent.class);
        }

        // 添加至 es
        this.addArticleToEs(params);

        return ResponseEntity.ok(ResponseResult.okResult(params));
    }

    @Override
    public ResponseEntity<ResponseResult> getArticleMenu(User user) {
        long userId = user.getId();
        if (user == null) {
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));
        }

        List<Article> articleList = articleMapper.selectList(new LambdaQueryWrapper<Article>().eq(Article::getUserId, userId));
        return ResponseEntity.ok(ResponseResult.okResult(articleList));
    }

    @Override
    public ResponseEntity<ResponseResult> getArticleContent(Long id) {
        if (id == null) {
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));
        }

        Query query = Query.query(Criteria.where("ArticleId").is(id));
        ArticleContent articleContent = mongoTemplate.findOne(query, ArticleContent.class);
        return ResponseEntity.ok(ResponseResult.okResult(articleContent));
    }

    @Override
    public ResponseEntity<ResponseResult> searchArticleMenu(String keyWord) {
        User user = ThreadLocalUtil.getUser();

        SearchRequest searchRequest = new SearchRequest("app_info_article");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();

        QueryStringQueryBuilder queryStringQueryBuilder = QueryBuilders.queryStringQuery(keyWord).field("title").field("content").defaultOperator(Operator.OR);

        QueryBuilder termQueryBuilder = QueryBuilders.termQuery("userId", user.getId());

        boolQueryBuilder.must(queryStringQueryBuilder);
        boolQueryBuilder.must(termQueryBuilder);

        searchSourceBuilder.query(boolQueryBuilder);
        searchRequest.source(searchSourceBuilder);

        ArrayList<SearchArticleVo> vos = new ArrayList<>();
        try {
            SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
            SearchHits hits = searchResponse.getHits();
            for (SearchHit hit : hits.getHits()) {
                String json = hit.getSourceAsString();
                SearchArticleVo vo = JSON.parseObject(json, SearchArticleVo.class);
                vos.add(vo);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(ResponseResult.okResult(vos));
    }

    @Override
    public ResponseEntity<ResponseResult> delete(String id) {
        Article article = articleMapper.selectOne(new LambdaQueryWrapper<Article>().eq(Article::getRouterPath, id));
        int i = articleMapper.deleteById(article.getId());

        Query query = new Query(Criteria.where("ArticleId").is(article.getId()));
        mongoTemplate.remove(query, ArticleContent.class);

        DeleteByQueryRequest deleteRequest = new DeleteByQueryRequest("app_info_article");
        deleteRequest.setQuery(QueryBuilders.matchQuery("id", article.getId().toString()));

        try {
            restHighLevelClient.deleteByQuery(deleteRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }

        if (i > 0) return ResponseEntity.ok(ResponseResult.okResult(AppHttpCodeEnum.SUCCESS));

        return ResponseEntity.ok(ResponseResult.okResult(AppHttpCodeEnum.SERVER_ERROR));
    }

    @Async
    public void addArticleToEs(ArticleVo params) {
        SearchArticleVo vo = SearchArticleVo.init(params);

        String[] imagesUrl = params.getImagesUrl();
        if (imagesUrl != null) {
            String str = "";
            for (String s : imagesUrl) {
                try {
                    byte[] bytes = fileStorageService.downLoadFile(s);
                    ByteArrayInputStream in = new ByteArrayInputStream(bytes);
                    BufferedImage imageFile = ImageIO.read(in);

                    // 识别出来的文字
                    str += tess4jClient.doOCR(imageFile);

                    System.out.println("=====>" + str);
                    vo.setContent(vo.getContent() + str);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

        IndexRequest indexRequest = new IndexRequest("app_info_article")
                .id(vo.getId().toString())
                .source(JSON.toJSONString(vo), XContentType.JSON);

        try {
            restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
