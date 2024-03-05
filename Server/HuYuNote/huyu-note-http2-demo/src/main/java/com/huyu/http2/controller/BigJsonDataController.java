package com.huyu.http2.controller;

import com.huyu.http.service.CorsDomainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/http2/test")
public class BigJsonDataController {
    @Autowired
    CorsDomainService corsDomainService;

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

//    @GetMapping("/servicePush")
//    public void servicePush(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        System.out.println(request.newPushBuilder());
//
//        request.newPushBuilder().path("/getFinancialList").push();
//    }
}
