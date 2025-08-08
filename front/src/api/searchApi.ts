import axios from "axios";
import { SearchListDTO } from "types/search.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

// 검색
export const searchCorp = async (corpName: string): Promise<SearchListDTO[]> => {
    const res = await axios.post<SearchListDTO[]>(`${BASE_URL}v1/search/list?corpName=${encodeURIComponent(corpName)}`);
    return res.data;
}

// 리포트로 이동
//export const reportOutput = async (corpName: string, userPurpose: string): Promise