import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import SetToken from '@/Store/User/SetToken'
import SetEmail from '@/Store/User/SetEmail'

export default buildSlice('user', [SetToken, SetEmail], {
    email: '',
    token: {
        userId: '',
        refreshToken: '',
        accessToken: '',
        tokenType: ''
    }
}).reducer
