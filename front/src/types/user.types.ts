import { JobType, PurposeType, InvestmentType } from "constants/joinOption";

// 사용자 정보 모델
export interface UserDTO {
    userId: string; // 아이디
    userPw: string; // 비밀번호
    phone: string; // 휴대전화번호
    job: JobType; // 직업
    purpose: PurposeType; // 서비스사용목적
    investmentType: InvestmentType; // 투자유형
    agreement: boolean; // 약관동의
    success?: boolean;
}

export type LoginType = Pick<UserDTO, 'userId' | 'userPw' | 'success'>

// 회원가입 응답 모델
export interface JoinRes {
    success: boolean; // 회원가입 성공 여부
}