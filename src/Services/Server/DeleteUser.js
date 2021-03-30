import api from '@/Services'
import { Config } from '@/Config'
import { PurgeStore } from '@/Store'
import CheckHandleResponseErrors from './Util/ResponseErrorHandler'

export default async (token, dispatch) => {
    // Mock data (if selected)
    if (Config.mocking.apiConnection) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(PurgeStore());
        return;
    }
    
    // Request data
    var error = undefined;
    const headers = {
        'Authorization': token.tokenType + ' ' + token.accessToken,
        'refreshToken': token.refreshToken
    }
    await api.delete(`/user`, {
        headers: headers
    }).catch(err => error = err);

    // Check for errors
    var errorCheck = CheckHandleResponseErrors(error, dispatch);
    if (!errorCheck[0])
        throw errorCheck[1];

    // Remove all data from the Redux store
    dispatch(PurgeStore());
}
