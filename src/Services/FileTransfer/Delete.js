import { RemoveEncryptionComponent } from '@/Store/FileTransfer'
import { DeleteUserFileService } from '@/Services/Server'

export default async (fileId, token, dispatch) => {
    // Delete the local encrpytion component
    dispatch(RemoveEncryptionComponent.action({ fileId: fileId }));

    // Request the file to be deleted on the server
    return await DeleteUserFileService(dispatch, token, fileId);
}
