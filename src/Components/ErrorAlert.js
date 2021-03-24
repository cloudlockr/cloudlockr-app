import Toast from 'react-native-toast-message'

const ErrorAlert = (message="Error", details) => {
    Toast.show({
        text1: message,
        text2: details,
        type: 'error',
        position: 'bottom',
        visibilityTime: 10000
    });
}

export default ErrorAlert;
