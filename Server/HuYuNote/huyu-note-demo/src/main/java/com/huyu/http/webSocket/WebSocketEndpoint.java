package com.huyu.http.webSocket;

import com.alibaba.fastjson.JSON;
import com.huyu.http.model.vos.SocketMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/*
    WebSocket连接的路由，如ws://127.0.0.1:8080/websocket
    支持路径参数，如/websocket/{id}
 */

@Component    //使用此注解Spring将自动注册ServerEndpoint
@ServerEndpoint(value = "/websocket", configurator = WebSocketConfigurator.class)
public class WebSocketEndpoint {

    private static Map<String, Session> sessionMap = new HashMap<>();

    private static final Logger log = LoggerFactory.getLogger(WebSocketEndpoint.class);

    /*
        若有路径参数则使用 @PathParam 注解来获取变量
     */
    @OnOpen
    public void onOpen(Session session, EndpointConfig config) {
        log.info("WebSocket连接建立");
        String userId = (String) session.getUserProperties().get("userId");
        sessionMap.put(userId, session);
    }

    @OnClose
    public void onClose(Session session, CloseReason closeReason) throws IOException {
        log.info("WebSocket连接关闭");
        String userId = (String) session.getUserProperties().get("userId");
        sessionMap.remove(userId);
        session.close();
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        log.warn("WebSocket连接异常：" + throwable);
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        log.info("WebSocket消息：" + message);

        String userId = (String) session.getUserProperties().get("userId");


        for (String key : sessionMap.keySet()) {
            sessionMap.get(key).getBasicRemote().sendText(JSON.toJSONString(new SocketMessage(userId, message)));
        }
    }
}
