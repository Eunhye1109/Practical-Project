


def format_date(date_str):
    """YYYYMMDD → YYYY.MM.DD 포맷으로 변환"""
    if date_str and len(date_str) == 8:
        return f"{date_str[:4]}.{date_str[4:6]}.{date_str[6:]}"
    return date_str  # None이나 이상한 형식일 경우 그대로 반환
