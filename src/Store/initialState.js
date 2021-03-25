const initialState = {
    fileTransfer: {
        details: {},
        progress: {
            progress: 0,
            statusMessage: 'initializing',
            timeRemainingMsg: 'tbd',
            indeterminate: true
        },
    },
    intention: {
        intention: {}
    },
    startup: {
        loading: false,
        error: null
    },
    user: {
        email: '',
        token: {
            userId: '',
            refreshToken: '',
            accessToken: '',
            tokenType: ''
        }
    }
}

export default initialState;
