package com.huyu.http.webSocket;

import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;

public class WebSocketConfigurator extends ServerEndpointConfig.Configurator {

    // WebSocketConfig类
    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request, HandshakeResponse response) {
        // 获取userId参数
        String userId = request.getParameterMap().get("userId").get(0);
        // 将userId放入attributes中
        sec.getUserProperties().put("userId", userId);
    }
}