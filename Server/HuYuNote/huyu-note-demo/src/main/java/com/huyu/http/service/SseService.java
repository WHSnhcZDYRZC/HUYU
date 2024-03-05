package com.huyu.http.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

public interface SseService {
    public SseEmitter getConn(String clientId);

    public void send(String clientId, String message);

    public void closeConn(String clientId);
}
