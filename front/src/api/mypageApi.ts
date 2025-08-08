import axios from "axios";
import { mypageData } from "types/mypage.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

// 관심기업 저장
export const saveCorp = async (userId: string, corpCode: string, uComment: string): Promise<mypageData> => {
    const res = await axios.post<mypageData>(`${BASE_URL}v1/company?userId=${userId}&corpCode=${corpCode}&u_comment=${uComment}`);
    return res.data;
}

// 관심기업 삭제
export const deleteCorp = async (userId: string, corpName: string) => {
    const res = await axios.delete(`${BASE_URL}v1/company/${userId}/${corpName}`);
    return res.data.success;
}