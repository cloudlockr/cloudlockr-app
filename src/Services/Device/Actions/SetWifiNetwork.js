import BasicRequestHandler from '../Communication/BasicRequestHandler';

export default async (networkName, networkPassword) => {
    const requestMessage = {
        "messageType": 6,
        "networkName": networkName,
        "networkPassword": networkPassword
    };

    await BasicRequestHandler(requestMessage);
}
