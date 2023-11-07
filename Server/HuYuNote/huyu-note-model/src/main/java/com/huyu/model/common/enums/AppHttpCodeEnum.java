package com.huyu.model.common.enums;

public enum AppHttpCodeEnum {

    // 成功段0
    SUCCESS(200, "操作成功"),
    // 登录段
    NEED_LOGIN(1, "需要登录后操作"),
    LOGIN_PASSWORD_ERROR(501, "用户名或密码错误"),
    LOGIN_USER_ERROR(501, "用户不存在"),

    // TOKEN
    TOKEN_INVALID(50, "无效的TOKEN"),
    TOKEN_EXPIRE(51, "TOKEN已过期"),
    TOKEN_REQUIRE(52, "TOKEN是必须的"),

    // SIGN验签
    SIGN_INVALID(100, "无效的SIGN"),
    SIG_TIMEOUT(101, "SIGN已过期"),

    // 参数错误
    PARAM_REQUIRE(500, "缺少参数"),
    PARAM_INVALID(501, "无效参数"),
    PARAM_IMAGE_FORMAT_ERROR(502, "图片格式有误"),
    SERVER_ERROR(503, "服务器内部错误"),

    // 数据错误
    DATA_EXIST(1000, "数据已经存在"),
    AP_USER_DATA_NOT_EXIST(1001, "ApUser数据不存在"),
    DATA_NOT_EXIST(1002, "数据不存在"),

    // 数据错误
    NO_OPERATOR_AUTH(3000, "无权限操作"),
    NEED_ADMIND(3001, "需要管理员权限"),

    // 自媒体文章错误
    MATERIASL_REFERENCE_FAIL(3501, "素材引用失效");

    int code;
    String message;

    AppHttpCodeEnum(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
