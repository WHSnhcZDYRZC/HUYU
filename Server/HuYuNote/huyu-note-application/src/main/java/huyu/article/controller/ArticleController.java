package huyu.article.controller;

import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import huyu.article.service.ArticleService;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/article")
public class ArticleController {
    @Autowired
    ArticleService articleService;

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

}
