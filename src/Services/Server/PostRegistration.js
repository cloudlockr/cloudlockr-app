import api from '@/Services'
import { Config } from '@/Config'
import CheckHandleResponseErrors from './Util/ResponseErrorHandler'
import SetToken from '@/Store/User/SetToken'
import SetEmail from '@/Store/User/SetEmail'

export default async (email, password, passwordConfirm, dispatch) => {
    // Mock data (if selected)
    if (Config.MOCK_EXTERNAL_CONNECTIONS)
        return [true, ''];
    
    // Request data
    var error = undefined;
    const headers = {
        'email': email,
        'password': password,
        'password1': passwordConfirm,
    }
    const response = await api.post(`user/register`, {}, {
        headers: headers
    }).catch(err => error = err);

    // Check for errors
    var errorCheck = CheckHandleResponseErrors(error, dispatch);
    if (!errorCheck[0])
        return errorCheck;
    
    // Persist token data
    dispatch(SetEmail.action(email));
    dispatch(SetToken.action(response.data));

    return [true, ''];
}
