package com.huyu.http.service.Impl;

import com.alibaba.fastjson.JSON;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.huyu.http.mapper.UserMapper;
import com.huyu.http.service.CorsDomainService;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CorsDomainServiceImpl extends ServiceImpl<UserMapper, User> implements CorsDomainService {
    @Autowired
    UserMapper userMapper;

    // 员工列表、影视列表、书籍列表、手机列表、收藏列表、工作列表、游戏列表、食谱列表、音乐列表、财务列表
    private List<Map> employeeList = new ArrayList();

    private List<Map> movieList = new ArrayList();

    private List<Map> bookList = new ArrayList();

    private List<Map> phoneList = new ArrayList();

    private List<Map> favoritesList = new ArrayList();

    private List<Map> workList = new ArrayList();

    private List<Map> gameList = new ArrayList();

    private List<Map> recipeList = new ArrayList();

    private List<Map> musicList = new ArrayList();

    private List<Map> financialList = new ArrayList();

    {
        String time = (new SimpleDateFormat("yyyy-MM-dd")).format(new Date());

        for (int i = 0; i < 100000; i++) {
            Map map = new HashMap();
            map.put("name", "员工" + (i + 1));
            map.put("age", (i + 1));
            map.put("sex", "男");

            Map movie = new HashMap();
            movie.put("name", "电影" + (i + 1));
            movie.put("author", "作者" + (i + 1));
            movie.put("time", time);

            Map book = new HashMap();
            book.put("name", "书" + (i + 1));
            book.put("author", "作者" + (i + 1));
            book.put("time", time);

            Map phone = new HashMap();
            phone.put("name", "手机" + (i + 1));
            phone.put("brand", "品牌" + (i + 1));
            phone.put("time", time);

            Map favorites = new HashMap();
            favorites.put("name", "藏品" + (i + 1));
            favorites.put("brand", "品牌" + (i + 1));
            favorites.put("time", time);

            Map work = new HashMap();
            work.put("name", "任务" + (i + 1));
            work.put("employee", "员工" + (i + 1));
            work.put("time", time);

            Map game = new HashMap();
            game.put("name", "游戏" + (i + 1));
            game.put("brand", "品牌" + (i + 1));
            game.put("time", time);

            Map recipe = new HashMap();
            recipe.put("name", "菜谱" + (i + 1));
            recipe.put("author", "作者" + (i + 1));
            recipe.put("time", time);

            Map music = new HashMap();
            music.put("name", "音乐" + (i + 1));
            music.put("author", "作者" + (i + 1));
            music.put("time", time);

            Map financial = new HashMap();
            financial.put("name", "项目" + (i + 1));
            financial.put("author", "作者" + (i + 1));
            financial.put("time", time);

            employeeList.add(map);
            movieList.add(movie);
            bookList.add(book);
            phoneList.add(phone);
            favoritesList.add(favorites);
            workList.add(work);
            gameList.add(game);
            recipeList.add(recipe);
            musicList.add(music);
            financialList.add(financial);
        }
    }

    @Override
    public ResponseEntity getTableData() {
        List<User> users = userMapper.selectList(null);
        return ResponseEntity.ok(ResponseResult.okResult(users));
    }

    @Override
    public ResponseEntity getUserDataJsonp() {
        List<User> users = userMapper.selectList(null);
        return ResponseEntity.ok("handleCallback(" + JSON.toJSONString(users) + ")");
    }

    @Override
    public ResponseEntity getEmployeeList() {
        return ResponseEntity.ok(ResponseResult.okResult(employeeList));
    }

    @Override
    public ResponseEntity getMovieList() {
        return ResponseEntity.ok(ResponseResult.okResult(movieList));
    }

    @Override
    public ResponseEntity getBookList() {
        return ResponseEntity.ok(ResponseResult.okResult(bookList));
    }

    @Override
    public ResponseEntity getPhoneList() {
        return ResponseEntity.ok(ResponseResult.okResult(phoneList));
    }

    @Override
    public ResponseEntity getFavoritesList() {
        return ResponseEntity.ok(ResponseResult.okResult(favoritesList));
    }

    @Override
    public ResponseEntity getWorkList() {
        return ResponseEntity.ok(ResponseResult.okResult(workList));
    }

    @Override
    public ResponseEntity getGameList() {
        return ResponseEntity.ok(ResponseResult.okResult(gameList));
    }

    @Override
    public ResponseEntity getRecipeList() {
        return ResponseEntity.ok(ResponseResult.okResult(recipeList));
    }

    @Override
    public ResponseEntity getMusicList() {
        return ResponseEntity.ok(ResponseResult.okResult(musicList));
    }

    @Override
    public ResponseEntity getFinancialList() {
        return ResponseEntity.ok(ResponseResult.okResult(financialList));
    }
}