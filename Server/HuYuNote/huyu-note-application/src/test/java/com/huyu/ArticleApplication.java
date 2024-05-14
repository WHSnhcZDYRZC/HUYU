package java.com.huyu.article;

import com.alibaba.fastjson.JSON;
import com.huyu.model.article.vos.SearchArticleVo;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;
import java.util.Date;

@SpringBootTest(classes = ArticleApplication.class)
@RunWith(SpringRunner.class)
public class ArticleApplication {

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    @Test
    public void add() {
        try {
            SearchArticleVo vo = new SearchArticleVo();
            vo.setId(1L);
            vo.setTitle("测试文章");
            vo.setContent("JavaScript 是前端语言，Java 是后端语言");
            vo.setPublishTime(new Date());
            vo.setUserId(2L);

            IndexRequest indexRequest = new IndexRequest("app_info_article")
                    .id("1")
                    .source(JSON.toJSONString(vo), XContentType.JSON);

            restHighLevelClient.index(indexRequest, RequestOptions.DEFAULT);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}