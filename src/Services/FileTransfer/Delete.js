import { RemoveEncryptionComponent } from '@/Store/FileTransfer'
import { DeleteUserFileService } from '@/Services/Server'

export default async (fileId, token, dispatch) => {
    // Request the file to be deleted on the server
    var response = await DeleteUserFileService(dispatch, token, fileId);

    // Delete the local encrpytion component
    dispatch(RemoveEncryptionComponent.action({ fileId: fileId }));

    return response;
}
