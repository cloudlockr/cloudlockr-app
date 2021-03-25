import BasicRequestHandler from '../Communication/BasicRequestHandler';

export default async (hexCode, devicePassword) => {
    const requestMessage = {
        "messageType": 2,
        "password": devicePassword,
        "hex": hexCode
    };

    await BasicRequestHandler(requestMessage);
}
