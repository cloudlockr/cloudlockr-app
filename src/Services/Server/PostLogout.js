import api from '@/Services'
import { Config } from '@/Config'
import { PurgeStore } from '@/Store'

export default async (token, dispatch) => {
    // Mock data (if selected)
    if (Config.MOCK_EXTERNAL_CONNECTIONS)
        return [true, ''];
    
    // Request data
    var errorMessage = undefined;
    const headers = {
        'authorization': token.tokenType + ' ' + token.accessToken,
        'refreshToken': token.refreshToken
    }
    await api.post(`user/logout`, {}, {
        headers: headers
    }).catch(err => {
        errorMessage = err.data.errors[0];
        errorMessage = errorMessage[Object.keys(errorMessage)[0]];
    });

    // Check for errors
    if (errorMessage !== undefined)
        return [false, errorMessage];
    
    // Remove all data from the Redux store
    dispatch(PurgeStore());

    return [true, ''];
}
