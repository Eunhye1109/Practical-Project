package com.project.web.dto;

import java.util.List;
import lombok.Data;

@Data
public class FastApiResponseDTO {
	
    private List<SearchListDTO> data;
}