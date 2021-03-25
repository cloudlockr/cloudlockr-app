import BasicRequestHandler from '../Communication/BasicRequestHandler';

export default async () => {
    const requestMessage = {
        "messageType": 1
    };

    await BasicRequestHandler(requestMessage);
}
