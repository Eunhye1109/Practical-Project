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
            15: '#e5e5e5ff',
            10: '#f5f5f5ff',
            5: '#fafafaff',
            0: '#FFFFFF'
        },
        primary: { 
            110: '#4c3bb9ff',
            100: '#745FFF',
            80: '#907FFF',
            60: '#AC9FFF',
            40: '#C7BFFF',
            30: '#d8d2ffff',
            20: '#f3f1ffff',
        },
        primaryBlue: {
            100: '#8298FF',
            80: '#9BADFF',
            60: '#B4C1FF',
            40: '#CDD6FF',
            20: '#E6EAFF',
        },
        primaryGreen: {
            100: '#AEDB00',
            80: '#BEE233',
            60: '#CEE966',
            40: '#DFF199',
            20: '#EFF8CC',
        },
        gradient: {
            cross: 'linear-gradient(225deg, #8B69F4 0%, #849AFF 100%)',
            greenCross: 'linear-gradient(-45deg, #8B69F4 0%, #9BADFF 100%)',
            crossOpacity: 'linear-gradient(225deg, rgba(139, 105, 244, 0.4) 0%, rgba(132, 154, 255, 0.4) 100%)',
            crossOpacityHigh: 'linear-gradient(-45deg, rgba(139, 105, 244, 0.1) 0%, rgba(132, 154, 255, 0.1) 100%)',
        }
    },
    typo: {
        title1Bold: {
            fontSize: '35px',
            fontWeight: 300,
            fontFamily: 'SB_Aggro'
        },
        title1Regular: {
            fontSize: '35px',
            fontWeight: 200,
            fontFamily: 'SB_Aggro'
        },
        title2Bold: {
            fontSize: '30px',
            fontWeight: 300,
            fontFamily: 'SB_Aggro'
        },
        title2Regular: {
            fontSize: '30px',
            fontWeight: 200,
            fontFamily: 'SB_Aggro'
        },
        title3Bold: {
            fontSize: '25px',
            fontWeight: 300,
            fontFamily: 'SB_Aggro'
        },
        title3Regular: {
            fontSize: '25px',
            fontWeight: 200,
            fontFamily: 'SB_Aggro'
        },
        bodyTitle1SemiBold: {
            fontSize: '23px',
            fontWeight: 700,
        },
        bodyTitle1Regular: {
            fontSize: '23px',
            fontWeight: 300,
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
            fontWeight: 600,
        },
        caption1Light: {
            fontSize: '16px',
            fontWeight: 400,
        },
        caption2Regular: {
            fontSize: '14px',
            fontWeight: 600,
        },
        caption2Light: {
            fontSize: '14px',
            fontWeight: 400,
        }
    }
}

export type AppTheme = typeof theme;