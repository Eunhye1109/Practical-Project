import axios from "axios";
import { ReportFullData } from "types/search.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

// 리포트로 이동
export const reportOutput = async (corpCode: string, userPurpose: string): Promise<ReportFullData> => {
    const res = await axios.get<ReportFullData>(`${BASE_URL}v1/search/${corpCode}`);
    return res.data;
}