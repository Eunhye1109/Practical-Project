package com.project.web.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HeaderDTO {
    private String corpName;
    private String logoUrl;
    private String major;
    private List<String> keyword;
}
