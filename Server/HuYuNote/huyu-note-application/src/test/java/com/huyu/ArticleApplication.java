package com.huyu;

import com.alibaba.fastjson.JSON;
import com.huy.fileStarter.service.FileStorageService;
import com.huy.tess4j.Tess4jClient;
import com.huyu.model.article.vos.SearchArticleVo;
import net.sourceforge.tess4j.TesseractException;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Date;

@SpringBootTest(classes = ArticleApplication.class)
@RunWith(SpringRunner.class)
public class ArticleApplication {

    @Autowired
    private RestHighLevelClient restHighLevelClient;

    @Autowired
    FileStorageService fileStorageService;

    @Autowired
    Tess4jClient tess4jClient;

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

    @Test
    public void doC() {
        try {
            byte[] bytes = fileStorageService.downLoadFile("http://192.168.200.131:9000/huyu/2024/05/09/Snipaste_2024-05-09_19-11-19.png");
            ByteArrayInputStream in = new ByteArrayInputStream(bytes);
            BufferedImage read = ImageIO.read(in);
            String str = tess4jClient.doOCR(read);
            System.out.println(str);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}