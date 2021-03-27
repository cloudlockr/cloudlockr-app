import api from '@/Services'
import { Config } from '@/Config'

export default async (dispatch, token, fileName, fileType) => {
    // Mock data (if selected)
    if (Config.mocking.apiConnection) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return;
    }
      
    // Request data
    var error = undefined;
    const headers = {
        'authorization': token.tokenType + ' ' + token.accessToken,
    }
    const body = {
        'fileName': fileName,
        'fileType': fileType
    }
    const response = await api.post(`/file`, body, {
        headers: headers
    }).catch(err => error = err);

    // Check for errors
    var errorCheck = CheckHandleResponseErrors(error, dispatch);
    if (!errorCheck[0])
        throw errorCheck[1];

    return response.data.fileId;
}
