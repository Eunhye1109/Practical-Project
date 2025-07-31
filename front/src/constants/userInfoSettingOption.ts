import React from "react";

// 직업 카테고리
export const jobList = ['직업1', '직업2', '직업3', '직업4', '직업5'];
export type JobType = (typeof jobList)[number];

// 서비스이용목적 카테고리
export const purposeList = ['목적1', '목적2', '목적3', '목적4', '목적5'];
export type PurposeType = (typeof purposeList)[number];

// 투자유형 카테고리
export const investmentTypeList = ['유형1', '유형2', '유형3'];
export type InvestmentType = (typeof investmentTypeList)[number];

// inputBox 데이터
export interface JoinInputOption {
  inputTitleLabel: string;
  inputLabel: string;
  textLabel: string;
  visible: boolean;
  type?: string;
  blur?: boolean;
  name: string;
}

export const joinInputOptions: JoinInputOption[] = [
  {
    name: "id",
    inputTitleLabel: "아이디",
    inputLabel: "아이디를 입력해주세요.",
    textLabel: "중복된 아이디가 존재합니다.",
    visible: false,
    blur: false,
  },
  {
    name: "prevPw",
    inputTitleLabel: " 현재 비밀번호",
    inputLabel: "현재 비밀번호를 입력해주세요.",
    textLabel: "비밀번호가 틀렸습니다.",
    visible: false,
    blur: true,
    type: "password",
  },
  {
    name: "pw",
    inputTitleLabel: " 새 비밀번호",
    inputLabel: "새 비밀번호를 입력해주세요.",
    textLabel: "간격조정",
    visible: false,
    blur: true,
    type: "password",
  },
  {
    name: "pwCheck",
    inputTitleLabel: "비밀번호 확인",
    inputLabel: "비밀번호를 다시 입력해주세요.",
    textLabel: "비밀번호가 일치하지 않습니다.",
    visible: true,
    blur: true,
    type: "password",
  },
  {
    name: "phone",
    inputTitleLabel: "휴대전화번호",
    inputLabel: "휴대전화 번호를 입력해주세요.",
    textLabel: "간격조정",
    visible: false,
    blur: false,
  },
];

// dropdown 데이터
export interface JoinDropdownOption {
    name: string;
    categoryList: string[];
    label: string;
}

export const joinDropdownOption: JoinDropdownOption[] = [
    {   
        name: 'job',
        categoryList: jobList,
        label: '직업',
    },
    {   
        name: 'purpose',
        categoryList: purposeList,
        label: '서비스 사용 목적',
    },
    {   
        name: 'investmentType',
        categoryList: investmentTypeList,
        label: '투자 유형',
    }
]

// 서비스 이용 약관
export const agreementText = `제1조 (목적)
본 약관은 주식회사 요즘기업 보고서(이하 '회사'라 한다)가 제공하는 '요즘기업 보고서' 서비스(이하 '서비스'라 한다)의 이용조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항 등을 규정함을 목적으로 합니다.

제2조 (용어의 정의)
'이용자'란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 개인 또는 법인을 말합니다.
'서비스'란 회사가 국민건강보험공단 등 공공기관의 금융정보 API를 기반으로 기업 재무·투자 분석 리포트를 제공하는 일체의 서비스를 말합니다.
'콘텐츠'란 서비스 내에서 제공되는 투자 분석 리포트, 데이터, 정보 및 기타 관련 자료를 의미합니다.

제3조 (약관의 효력 및 변경)
본 약관은 서비스를 통해 공지하거나 이용자가 동의한 시점부터 효력을 발생합니다.
회사는 관련 법령 및 서비스 정책 변경에 따라 약관을 변경할 수 있으며, 변경된 약관은 적용일 7일 전부터 공지하며, 이용자가 계속 서비스를 이용하는 경우 약관 변경에 동의한 것으로 간주합니다.

제4조 (서비스 제공 및 변경)
회사는 국민건강보험공단 등 공공기관의 금융정보 API를 활용해 기업 투자 분석 리포트를 제공합니다.
회사는 서비스 운영상 필요 시 일부 서비스 내용을 변경하거나 중단할 수 있으며, 사전 공지 후 이용자에게 불리한 경우 동의를 구합니다.

제5조 (이용자의 의무)
이용자는 서비스 이용 시 관련 법령과 본 약관을 준수해야 합니다.
이용자는 회사의 사전 동의 없이 서비스를 영리 목적으로 복제, 전송, 출판, 배포할 수 없습니다.
이용자는 제공된 정보의 정확성을 자체적으로 확인할 의무가 있으며, 투자 결정에 대한 최종 책임은 이용자에게 있습니다.

제6조 (정보의 제공 및 투자 위험 고지)
회사가 제공하는 분석 리포트는 국민건강보험공단 등 공공기관의 금융정보 API를 기반으로 하며, 최대한 정확성을 기하기 위해 노력하지만, 정보의 완전성·정확성에 대해 법적 책임을 지지 않습니다.
투자 결과는 시장 상황에 따라 변동될 수 있으며, 회사는 투자로 인한 손실에 대해 책임을 지지 않습니다.
이용자는 투자 판단 시 추가적인 전문가 상담을 권장합니다.

제7조 (저작권 및 지적재산권)
서비스 내 모든 콘텐츠에 대한 저작권 및 지적재산권은 회사 또는 해당 권리자에게 귀속됩니다.
이용자는 서비스를 통해 얻은 정보를 무단으로 복제, 배포, 2차 가공하는 행위를 금지합니다.

제8조 (개인정보 보호)
회사는 개인정보 보호법 등 관련 법령에 따라 이용자의 개인정보를 안전하게 관리합니다.
개인정보의 수집, 이용 및 보호에 관한 자세한 내용은 별도의 개인정보처리방침에서 정합니다.

제9조 (면책조항)
회사는 천재지변, 시스템 장애, 공공기관 API의 오류 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
회사는 이용자가 서비스를 통해 얻은 정보로 인해 발생하는 손실이나 손해에 대해 법적 책임을 부담하지 않습니다.

제10조 (분쟁 해결)
본 약관에 관한 분쟁은 회사 본사 소재지 관할 법원을 제1심 법원으로 합니다.
이용자와 회사 간 분쟁 발생 시 원만한 해결을 위해 협의하며, 협의가 어려울 경우 법적 절차에 따릅니다.

부칙
본 약관은 2025년 7월 26일부터 적용합니다.
`;