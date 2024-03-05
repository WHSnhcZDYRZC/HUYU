package com.huyu.http.controller;

import com.huyu.http.service.CorsDomainService;
import com.huyu.model.common.dtos.ResponseResult;
import com.huyu.model.personal.pojos.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test/cors-domain")
public class CorsDomainController {
    @Autowired
    CorsDomainService corsDomainService;

    @GetMapping("/getUserData")
    public ResponseEntity<ResponseResult<List<User>>> getData() {
        return corsDomainService.getTableData();
    }

    @PutMapping("/getUserData")
    public ResponseEntity<ResponseResult<List<User>>> getDataPut() {
        return corsDomainService.getTableData();
    }

    @GetMapping("/getUserDataJsonp")
    public ResponseEntity getUserDataJsonp() {
        return corsDomainService.getUserDataJsonp();
    }

    @GetMapping("/getEmployeeList")
    public ResponseEntity getEmployeeList() {
        return corsDomainService.getEmployeeList();
    }

    @GetMapping("/getMovieList")
    public ResponseEntity getMovieList() {
        return corsDomainService.getMovieList();
    }

    @GetMapping("/getBookList")
    public ResponseEntity getBookList() {
        return corsDomainService.getBookList();
    }

    @GetMapping("/getPhoneList")
    public ResponseEntity getPhoneList() {
        return corsDomainService.getPhoneList();
    }

    @GetMapping("/getFavoritesList")
    public ResponseEntity getFavoritesList() {
        return corsDomainService.getFavoritesList();
    }

    @GetMapping("/getWorkList")
    public ResponseEntity getWorkList() {
        return corsDomainService.getWorkList();
    }

    @GetMapping("/getGameList")
    public ResponseEntity getGameList() {
        return corsDomainService.getGameList();
    }

    @GetMapping("/getRecipeList")
    public ResponseEntity getRecipeList() {
        return corsDomainService.getRecipeList();
    }

    @GetMapping("/getMusicList")
    public ResponseEntity getMusicList() {
        return corsDomainService.getMusicList();
    }

    @GetMapping("/getFinancialList")
    public ResponseEntity getFinancialList() {
        return corsDomainService.getFinancialList();
    }
}
