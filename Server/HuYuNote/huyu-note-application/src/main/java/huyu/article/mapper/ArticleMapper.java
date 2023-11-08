package huyu.article.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.huyu.model.article.pojos.Article;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ArticleMapper extends BaseMapper<Article> {
}
