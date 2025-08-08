import axios from "axios";
import { SearchListDTO } from "types/search.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

// 검색
export const searchCorp = async (corpName: string): Promise<SearchListDTO[]> => {
    const res = await axios.post<SearchListDTO[]>(`${BASE_URL}v1/search/list?corpName=${encodeURIComponent(corpName)}`);
    return res.data;
}

// 검색어 저장
export const saveKeyword = async (userId: string, searchWord: string) => {
    const res = await axios.post(`${BASE_URL}v1/search/history`, {userId, searchWord});
    return res.data.success;
}

// 검색어 조회
export const hisKeyword = async (userId: string): Promise<{userId: string, searchWord: string}[]> => {
    const res = await axios.get<{userId: string, searchWord: string}[]>(`${BASE_URL}v1/search/getHis?user_id=${userId}`);
    return res.data;
}