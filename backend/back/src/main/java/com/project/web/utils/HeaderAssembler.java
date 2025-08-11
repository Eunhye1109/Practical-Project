// utils/HeaderAssembler.java
package com.project.web.utils;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.web.dto.HeaderDTO;
import com.project.web.mapper.SearchListMapper;
import com.project.web.vo.SearchListCacheVO;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class HeaderAssembler {

    private final SearchListMapper searchListMapper;
    private final ObjectMapper objectMapper;

    public HeaderDTO buildFromCache(String corpCode) {
        SearchListCacheVO cache = searchListMapper.selectHeaderByCorpCode(corpCode);

        HeaderDTO header = new HeaderDTO();
        if (cache == null) {
            header.setCorpName("정보없음");
            header.setLogoUrl("");
            header.setMajor("정보없음");
            header.setKeyword(Collections.emptyList());
            return header;
        }

        header.setCorpName(cache.getCorpName());
        header.setLogoUrl(cache.getLogoUrl());
        header.setMajor(cache.getMajor());

        String kj = cache.getKeywordsJson();
        try {
            if (kj != null && !kj.isBlank()) {
                List<String> keywords = objectMapper.readValue(
                        kj, new TypeReference<List<String>>() {});
                header.setKeyword(keywords);
            } else {
                header.setKeyword(Collections.emptyList());
            }
        } catch (Exception e) {
            // 로깅 원하면 Logger 주입해서 warn 정도로
            header.setKeyword(Collections.emptyList());
        }

        return header;
    }
}
