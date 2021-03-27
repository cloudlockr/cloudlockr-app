import api from '@/Services'
import { Config } from '@/Config'

const successMsg = "File was successfully deleted";

export default async (dispatch, token, fileId) => {
    // Mock data (if selected)
    if (Config.mocking.apiConnection) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return successMsg;
    }
    
    // Request data
    var error = undefined;
    const headers = {
        'Authorization': token.tokenType + ' ' + token.accessToken,
    }
    await api.delete(`/file/${fileId}`, {
        headers: headers
    }).catch(err => error = err);

    // Check for errors
    var errorCheck = CheckHandleResponseErrors(error, dispatch);
    if (!errorCheck[0])
        throw errorCheck[1];

    return successMsg;
}
