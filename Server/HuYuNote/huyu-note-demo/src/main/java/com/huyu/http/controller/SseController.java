package com.huyu.http.controller;

import com.huyu.http.service.SseService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.annotation.Resource;
import java.util.concurrent.CompletableFuture;

@RestController
public class SseController {
    @Resource
    private SseService sseService;

    @GetMapping(value = "/api/test/sse/{clientId}", produces = {MediaType.TEXT_EVENT_STREAM_VALUE})
    public SseEmitter startConn(@PathVariable("clientId") String clientId, @RequestParam String message) {
        final SseEmitter emitter = sseService.getConn(clientId);

        CompletableFuture.runAsync(() -> {
            sseService.send(clientId, message);
        });

        return emitter;
    }

    @GetMapping("/api/test/closeConn/{clientId}")
    public String closeConn(@PathVariable("clientId") String clientId) {
        sseService.closeConn(clientId);
        return "连接已关闭";
    }

}
