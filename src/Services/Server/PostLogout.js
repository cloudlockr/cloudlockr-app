import api from '@/Services'
import { Config } from '@/Config'
import { PurgeStore } from '@/Store'

export default async (token, dispatch) => {
    // Mock data (if selected)
    if (Config.mocking.apiConnection) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(PurgeStore());
        return;
    }
    
    // Request data (we are swallowing any errors as we are just locking the user out anyways)
    var error = undefined;
    const headers = {
        'authorization': token.tokenType + ' ' + token.accessToken,
        'refreshToken': token.refreshToken
    }
    await api.post(`user/logout`, {}, {
        headers: headers
    }).catch(err => error = err);
    
    // Remove all data from the Redux store
    dispatch(PurgeStore());
}
