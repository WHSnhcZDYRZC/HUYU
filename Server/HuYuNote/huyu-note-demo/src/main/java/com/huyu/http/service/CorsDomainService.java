package com.huyu.http.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.huyu.model.personal.pojos.User;
import org.springframework.http.ResponseEntity;

public interface CorsDomainService extends IService<User> {
    ResponseEntity getTableData();

    ResponseEntity getUserDataJsonp();

    public ResponseEntity getEmployeeList();

    public ResponseEntity getMovieList();

    public ResponseEntity getBookList();

    public ResponseEntity getPhoneList();

    public ResponseEntity getGameList();

    public ResponseEntity getFavoritesList();

    public ResponseEntity getWorkList();

    public ResponseEntity getRecipeList();

    public ResponseEntity getMusicList();

    public ResponseEntity getFinancialList();
}
