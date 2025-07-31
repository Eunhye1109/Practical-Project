import axios from "axios";
import { UserDTO, LoginType } from "types/user.types";

// 백엔드 주소
const BASE_URL = 'http://localhost:8087/api/';

export const loginUser = async (loginData: LoginType): Promise<LoginType> => {
    const res = await axios.post<LoginType>(`${BASE_URL}v1/auth/login`, loginData);
    return res.data;
}