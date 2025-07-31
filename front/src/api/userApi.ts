import axios from "axios";
import { UserDTO, LoginType } from "types/user.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

// 로그인
export const loginUser = async (loginData: LoginType): Promise<LoginType> => {
    const res = await axios.post<LoginType>(`${BASE_URL}v1/auth/login`, loginData);
    return res.data;
}

// 회원가입
export const joinUser = async (joinData: UserDTO) => {
    const res = await axios.post(`${BASE_URL}v1/auth/signup`, joinData);
    return res.data;
}

// 아이디 체크
export const idCheckUser = async (idData: string) => {
    const res = await axios.get(`${BASE_URL}v1/auth/check_id/${idData}`);
    return res.data;
}

// 회원탈퇴
export const deleteId = async (userData: LoginType) => {
    const res = await axios.get(`${BASE_URL}v1/info/secession/${userData.userId}/${userData.userPw}`);
    return res.data;
}