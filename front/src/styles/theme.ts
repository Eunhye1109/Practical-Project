export const theme = {
    colors: {
        natural: {
            100: '#121212',
            90: '#1A1A1A',
            80: '#333333',
            70: '#4C4C4C',
            60: '#666666',
            50: '#808080',
            40: '#999999',
            30: '#B3B3B3',
            20: '#CCCCCC',
            10: '#DCDCDC',
            5: '#f5f5f5ff',
            0: '#FFFFFF'
        },
        primary: {
            100: '#755FFF',
            10: '#E5E7FF',
        },
        gradient: {
            cross: 'linear-gradient(225deg, #8B69F4 0%, #849AFF 100%)',
            crossOpacity: 'linear-gradient(225deg, rgba(139, 105, 244, 0.4) 0%, rgba(132, 154, 255, 0.4) 100%)'
        }
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
            fontSize: '20px',
            fontWeight: 500,
        },
        body1Regular: {
            fontSize: '20px',
            fontWeight: 300,
        },
        body2SemiBold: {
            fontSize: '18px',
            fontWeight: 500,
        },
        body2Regular: {
            fontSize: '18px',
            fontWeight: 300,
        },
        caption1Regular: {
            fontSize: '16px',
            fontWeight: 400,
        },
        caption1Light: {
            fontSize: '16px',
            fontWeight: 200,
        },
        caption2Regular: {
            fontSize: '14px',
            fontWeight: 400,
        },
        caption2Light: {
            fontSize: '14px',
            fontWeight: 200,
        }
    }
}

export type AppTheme = typeof theme;