package com.huyu.model.article.pojos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * mongo 文章内容表
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "note_article")
public class ArticleContent {
    //    private static final long serialVersionUID = 9096178416317502524L;
    private ObjectId id;
    private Long userId;
    private Long ArticleId; // 文章 id
    private String ArticleContent; // 文章内容

    public ArticleContent(Long userId, long ArticleId, String ArticleContent) {
        this.userId = userId;
        this.ArticleId = ArticleId;
        this.ArticleContent = ArticleContent;
    }
}
