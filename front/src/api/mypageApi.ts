import axios from "axios";
import { addZAxis } from "recharts/types/state/cartesianAxisSlice";
import { mypageData } from "types/mypage.types";
import { UpdateUserVO, UserDTO } from "types/user.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

// 관심기업 저장
export const saveCorp = async (userId: string, corpCode: string, uComment: string) => {
    const res = await axios.post(`${BASE_URL}v1/company?userId=${userId}&corpCode=${corpCode}&uComment=${uComment}`);
    return res.data;
}

// 관심기업 조회
export const selectCorp = async (userId: string) => {
    const res = await axios.get(`${BASE_URL}v1/company/${userId}`);
    return res.data;
}

// 관심기업 수정
export const updateCorpe = async (userId: string, corpCode: string, uComment: string) => {
    const res = await axios.patch(`${BASE_URL}v1/company/comment?userId=${userId}&corpCode=${corpCode}&uComment=${uComment}`)
    return res.data;
}

// 관심기업 삭제
export const deleteCorp = async (userId: string, corpCode: string) => {
    const res = await axios.delete(`${BASE_URL}v1/company/${userId}/${corpCode}`);
    return res.data.success;
}

// 회원정보 조회
export const userDataInquiry = async (userId: string) => {
    const res = await axios.get(`${BASE_URL}v1/info/get/${userId}`);
    console.log('조회: ', res.data);
    
    return res.data;
}

// 회원정보 수정
export const userDataUpdate = async (userData: UpdateUserVO) => {
    const res = await axios.patch(`${BASE_URL}v1/auth/update`, userData, {
        headers: {
        'Content-Type': 'application/json',
        }
    });
    return res.data;
}