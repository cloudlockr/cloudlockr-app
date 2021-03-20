import { Alert } from 'react-native'

const ErrorAlert = (message="Error", details, confirmText="Okay") => {
    Alert.alert(
        message,
        details,
        [
            {
            text: confirmText,
            style: "cancel"
            }
        ],
        { cancelable: true }
    );
}

export default ErrorAlert;
