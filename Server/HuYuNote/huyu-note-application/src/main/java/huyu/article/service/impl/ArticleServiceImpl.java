package huyu.article.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.huy.thread.ThreadLocalUtil;
import com.huyu.model.article.pojos.Article;
import com.huyu.model.article.pojos.ArticleContent;
import com.huyu.model.article.vos.ArticleVo;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.common.enums.AppHttpCodeEnum;
import com.huyu.model.personal.pojos.User;
import huyu.article.mapper.ArticleMapper;
import huyu.article.service.ArticleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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

    @Override
    public ResponseEntity<ResponseResult> saveOrUpdateArticle(ArticleVo params) {
        if (StringUtils.isEmpty(params.getTitle()) || StringUtils.isEmpty(params.getArticleContent())) {
            return ResponseEntity.status(AppHttpCodeEnum.PARAM_REQUIRE.getCode()).body(ResponseResult.errorResult(AppHttpCodeEnum.PARAM_REQUIRE));
        }

        params.setUserId(params.getUserId());
        params.setArticleStatus(1);

        if (params.getId() == null) {
            // add
            this.save(params);
            ArticleContent articleContent = new ArticleContent(Long.valueOf(params.getUserId()), Long.valueOf(params.getId()), params.getArticleContent());
            mongoTemplate.save(articleContent);
        } else {
            // update
            this.updateById(params);
            Query query = Query.query(Criteria.where("ArticleId").is(params.getId()));
            mongoTemplate.findAndModify(query, new Update().set("ArticleContent", params.getArticleContent()), ArticleContent.class);
        }

        return ResponseEntity.ok(ResponseResult.okResult(params));
    }
}
