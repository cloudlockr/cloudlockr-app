import api from '@/Services'
import { Config } from '@/Config'
import dayjs from 'dayjs'
import CheckHandleResponseErrors from './Util/ResponseErrorHandler'

const fakeData = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        fileName: 'secret1.pdf',
        uploadDate: 'Jan 28, 2021'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        fileName: 'secret2.pdf',
        uploadDate: 'Jan 28, 2021'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        fileName: 'secret3.pdf',
        uploadDate: 'Jan 28, 2021'
    },
];

const dataTransformer = (serverData) => {
    var ret = [];

    for (let i = 0; i < serverData.length; i++) {
        ret.push({
            id: serverData[i].id,
            fileName: serverData[i].name,
            uploadDate: dayjs(serverData[i].createdAt).format('MMM D, YYYY')
        });
    }

    return ret;
}

export default async (dispatch, token) => {
    // Mock data (if selected)
    if (Config.mocking.apiConnection) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fakeData;
    }
      
    // Request data
    var error = undefined;
    const headers = {
        'Authorization': token.tokenType + ' ' + token.accessToken,
    }
    const response = await api.get(`/user/files`, {
        headers: headers
    }).catch(err => error = err);

    // Check for errors
    var errorCheck = CheckHandleResponseErrors(error, dispatch);
    if (!errorCheck[0])
        throw errorCheck[1];

    return dataTransformer(response.data.filesMetadata);
}
