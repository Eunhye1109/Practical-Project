# 컬럼 파싱 및 금액 정제

# utils/parser.py

"""
[기능] DART 재무 데이터 파싱 유틸
- 금액 문자열 정제
- 향후 컬럼 매핑/정규화용 함수도 여기에 추가 예정
"""

def parse_amount(value: str) -> int | None:
    """금액 문자열(예: '1,234,567') → 정수형으로 변환"""
    if not value or value in ["", "-", None]:
        return None
    try:
        return int(value.replace(",", "").replace(" ", "").strip())
    except ValueError:
        return None

def normalize_amount(value) -> float | None:
    try:
        if value is None or value != value:  # NaN 체크
            return None
        if isinstance(value, (int, float)):
            return float(value)
        return float(str(value).replace(",", "").strip())
    except (ValueError, TypeError):
        return None

