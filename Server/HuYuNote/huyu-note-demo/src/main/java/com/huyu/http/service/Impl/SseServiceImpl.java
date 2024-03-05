package com.huyu.http.service.Impl;

import com.huyu.http.service.SseService;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseServiceImpl implements SseService {
    private static final Map<String, SseEmitter> SSE_CACHE = new ConcurrentHashMap<>();

    @Override
    public SseEmitter getConn(String clientId) {
        final SseEmitter sseEmitter = SSE_CACHE.get(clientId);

        if (sseEmitter != null) {
            return sseEmitter;
        } else {
            // 设置连接超时时间，需要配合配置项 spring.mvc.async.request-timeout: 600000 一起使用
            final SseEmitter emitter = new SseEmitter(600_000L);
            // 注册超时回调，超时后触发
            emitter.onTimeout(() -> {
                System.out.println("连接已超时，正准备关闭，clientId = " + clientId);
                SSE_CACHE.remove(clientId);
            });
            // 注册完成回调，调用 emitter.complete() 触发
            emitter.onCompletion(() -> {
                System.out.println("连接已关闭，正准备释放，clientId = " + clientId);
                SSE_CACHE.remove(clientId);
                System.out.println("连接已释放，clientId = " + clientId);
            });
            // 注册异常回调，调用 emitter.completeWithError() 触发
            emitter.onError(throwable -> {
                System.out.println("连接已异常，正准备关闭，clientId = " + clientId + "：" + throwable);
                SSE_CACHE.remove(clientId);
            });

            SSE_CACHE.put(clientId, emitter);

            return emitter;
        }
    }

    /**
     * 模拟类似于 chatGPT 的流式推送回答
     *
     * @param clientId 客户端 id
     */
    @SneakyThrows
    @Override
    public void send(String clientId, String message) {
        final SseEmitter emitter = SSE_CACHE.get(clientId);

        //模拟推送数据
        String str = "编程的本质是通过一系列指令和算法来指导计算机执行特定任务的过程。它涉及将问题分解成可执行的步骤，设计并实现解决方案，然后将其转化为计算机可以理解和执行的代码。编程的核心在于解决问题、实现功能和创造价值。它需要逻辑思维、创造力和持续的学习，同时还需要对计算机科学和编程语言等技术领域有深入的理解。在实践中，编程通常涉及调试、优化和不断改进代码，以确保其正确性、效率和可维护性。";

        String[] strArr = str.split("");

        while (true) {
            // 推流内容到客户端
            for (String item : strArr) {
                emitter.send(item);
                Thread.sleep(100);
            }
            emitter.send("<br />");
        }

        // 结束推流
//        emitter.complete();
    }

    @Override
    public void closeConn(String clientId) {
        final SseEmitter sseEmitter = SSE_CACHE.get(clientId);
        if (sseEmitter != null) {
            sseEmitter.complete();
        }
    }

}
