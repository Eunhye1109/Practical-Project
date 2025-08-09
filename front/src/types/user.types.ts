import { JobType, PurposeType, InvestmentType } from "constants/joinOption";

// 사용자 정보 모델
export interface UserDTO {
    userId: string; // 아이디
    userPw: string; // 비밀번호
    userPhone: string; // 휴대전화번호
    userJob: JobType; // 직업
    userPurpose: PurposeType; // 서비스사용목적
    riskType: InvestmentType; // 투자유형
    termsAgree?: number; // 약관동의
    success?: boolean;
}

// 로그인 타입
export type LoginType = Pick<UserDTO, 'userId' | 'userPw' | 'riskType' | 'success'>;

// 회원 탈퇴 차입
export type DeleteUserType = Pick<UserDTO,'userId' | 'userPw' | 'success'>;

// 사용자 정보 모델
export interface UpdateUserVO {
    userId: string; // 아이디
    newUserId: string; // 아이디
    userPw: string; // 비밀번호
    userPhone: string; // 휴대전화번호
    userJob: JobType; // 직업
    userPurpose: PurposeType; // 서비스사용목적
    riskType: InvestmentType; // 투자유형
}