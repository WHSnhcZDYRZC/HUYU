package com.huyu.http.model.vos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableItem {
    private String username;
    private Integer age;
    private String gender;
}
