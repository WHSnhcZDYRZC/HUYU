package com.huyu.model.article.vos;

import lombok.Data;

import java.util.Date;
//
//{
//        "mappings":{
//        "properties":{
//        "id":{
//        "type":"long"
//        },
//        "userId":{
//        "type":"long"
//        },
//        "title":{
//        "type":"text",
//        "analyzer":"ik_smart"
//        },
//        "content":{
//        "type":"text",
//        "analyzer":"ik_smart"
//        },
//        "publishTime":{
//        "type":"date"
//        }
//        }
//        }
//        }

@Data
public class SearchArticleVo {

    // 文章id
    private Long id;

    // 作者id
    private Long userId;

    // 文章标题
    private String title;

    // 文章发布时间
    private Date publishTime;

    //文章内容
    private String content;

    // 文章路径
    private String path;

    static public SearchArticleVo init(ArticleVo params) {
        Long id = params.getId();
        Long userId = params.getUserId();
        String title = params.getTitle();
        Date createdTime = params.getCreatedTime();
        String articleContent = params.getArticleContent();
        String path = params.getRouterPath();

        SearchArticleVo vo = new SearchArticleVo();
        vo.setId(id);
        vo.setUserId(userId);
        vo.setContent(articleContent);
        vo.setTitle(title);
        vo.setPublishTime(createdTime);
        vo.setPath(path);

        return vo;
    }
}