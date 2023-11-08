package huyu.article.controller;

import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import huyu.article.service.ArticleService;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    ArticleService articleService;

    @PostMapping("/saveOrUpdate")
    public ResponseEntity<ResponseResult> saveOrUpdate(@RequestBody ArticleVo params) {
        return articleService.saveOrUpdateArticle(params);
    }

}
