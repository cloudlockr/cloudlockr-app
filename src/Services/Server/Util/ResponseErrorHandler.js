import { navigateAndSimpleReset } from '@/Navigators/Root'
import { PurgeStore } from '@/Store'

export default CheckHandleResponseErrors = (err, dispatch) => {
    // Check if there is even an error
    if (err === undefined)
        return [true, ''];

    // Check for specific special errors
    var tokenRejected = checkHandleTokenRejection(err.status, dispatch);
    if (!tokenRejected[0])
        return tokenRejected;

    // Otherwise return the error message to handle the generic case
    return handleGenericError(err);
}

const checkHandleTokenRejection = (statusCode, dispatch) => {    
    if (statusCode === 403) {
        // Clear Redux store data and send user back to login page
        dispatch(PurgeStore());
        navigateAndSimpleReset('Main');

        return [false, 'You were logged out due to inactivity. Please log back in to access data.'];
    }

    return [true, ''];
}

const handleGenericError = (err) => {
    var errorMessage = err.data.errors[0][Object.keys(err.data.errors[0])[0]];
    return [false, errorMessage];
}
