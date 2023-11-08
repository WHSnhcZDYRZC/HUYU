package huyu.article.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.huyu.model.article.pojos.Article;
import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import org.springframework.http.ResponseEntity;

public interface ArticleService extends IService<Article> {

    ResponseEntity<ResponseResult> saveOrUpdateArticle(ArticleVo params);
}
