package com.project.web.dto;

import java.util.List;

import lombok.Data;

@Data
public class HeaderDTO {
    private String corpName;
    private String imgUrl;
    private String major;
    private List<String> keyword;
}
