package huyu.article.controller;

import com.alibaba.fastjson.JSON;
import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.article.vos.SearchArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import huyu.article.service.ArticleService;
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

    @GetMapping("/getArticleMenu")
    public ResponseEntity<ResponseResult> getArticleMenu(User user) {
        return articleService.getArticleMenu(user);
    }

    @GetMapping("/getArticleContent/{id}")
    public ResponseEntity<ResponseResult> getArticleContent(@PathVariable("id") Long id) {
        return articleService.getArticleContent(id);
    }

//    @GetMapping("/addEsTest")
//    public void addEsTest() {
//        try {
//            SearchArticleVo vo = new SearchArticleVo();
//            vo.setId(1L);
//            vo.setTitle("测试文章");
//            vo.setContent("JavaScript 是前端语言，Java 是后端语言");
//            vo.setPublishTime(new Date());
//            vo.setUserId(2L);
//
//            IndexRequest indexRequest = new IndexRequest("app_info_article")
//                    .id("1")
//                    .source(JSON.toJSONString(vo), XContentType.JSON);
//
//            restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//
//    @GetMapping("/searchEsTest")
//    public void searchEsTest() {
//        SearchRequest searchRequest = new SearchRequest("app_info_article");
//        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
//
//        BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
//
//        QueryStringQueryBuilder queryStringQueryBuilder = QueryBuilders.queryStringQuery("测试").field("title").field("content").defaultOperator(Operator.OR);
//
//        boolQueryBuilder.must(queryStringQueryBuilder);
//
//        searchSourceBuilder.query(boolQueryBuilder);
//
//        searchRequest.source(searchSourceBuilder);
//
//        SearchResponse searchResponse = null;
//        try {
//            searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);
//
//            SearchHits hits = searchResponse.getHits();
//            for (SearchHit hit : hits.getHits()) {
//                String json = hit.getSourceAsString();
//                System.out.println(json);
//            }
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

}
