export const theme = {
    colors: {
        natural100: '#121212',
        natural90: '#1A1A1A',
        natural80: '#333333',
        natural70: '#4C4C4C',
        natural60: '#666666',
        natural50: '#808080',
        natural40: '#999999',
        natural30: '#B3B3B3',
        natural20: '#CCCCCC',
        natural10: '#DCDCDC',
        natural05: '#E6E6E6',
    },
    typo: {
        title1Bold: {
            fontSize: '35px',
            fontWeight: 300,
            fontFamily: 'SB어그로'
        },
        title1Regular: {
            fontSize: '35px',
            fontWeight: 200,
            fontFamily: 'SB어그로'
        },
        title2Bold: {
            fontSize: '30px',
            fontWeight: 300,
            fontFamily: 'SB어그로'
        },
        title2Regular: {
            fontSize: '30px',
            fontWeight: 200,
            fontFamily: 'SB어그로'
        },
        body1SemiBold: {
            fontSize: '25px',
            fontWeight: 500,
        },
        body1Regular: {
            fontSize: '25px',
            fontWeight: 300,
        },
        body2SemiBold: {
            fontSize: '20px',
            fontWeight: 500,
        },
        body2Regular: {
            fontSize: '20px',
            fontWeight: 300,
        },
        caption1Regular: {
            fontSize: '18px',
            fontWeight: 300,
        },
        caption1Light: {
            fontSize: '18px',
            fontWeight: 200,
        },
        caption2Regular: {
            fontSize: '14px',
            fontWeight: 300,
        },
        caption2Light: {
            fontSize: '14px',
            fontWeight: 200,
        }
    }
}

export type AppTheme = typeof theme;