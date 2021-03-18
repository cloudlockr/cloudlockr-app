import api from '@/Services'
import { Config } from '@/Config'
import SetToken from '@/Store/User/SetToken'
import SetEmail from '@/Store/User/SetEmail'

export default async (email, password, passwordConfirm, dispatch) => {
    // Mock data (if selected)
    if (Config.MOCK_EXTERNAL_CONNECTIONS)
        return [true, ''];
    
    // Request data
    var errorMessage = undefined;
    const headers = {
        'email': email,
        'password': password,
        'password1': passwordConfirm,
    }
    const response = await api.post(`user/register`, {}, {
        headers: headers
    }).catch(err => {
        errorMessage = err.data.errors[0];
        errorMessage = errorMessage[Object.keys(errorMessage)[0]];
    });

    // Check for errors
    if (errorMessage !== undefined)
        return [false, errorMessage];
    
    // Persist token data
    dispatch(SetEmail.action(email));
    dispatch(SetToken.action(response.data));

    return [true, ''];
}
