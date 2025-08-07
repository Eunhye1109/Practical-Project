import axios from "axios";
import { SearchListDTO } from "types/search.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

// 검색
export const searchCorp = async (corpName: string): Promise<SearchListDTO[]> => {
    const url = `${BASE_URL}v1/search/${corpName}`;
  console.log('API 요청 URL:', url); // 디버깅용
    const res = await axios.get<SearchListDTO[]>(`${BASE_URL}v1/search/${corpName}`);
    return res.data;
}