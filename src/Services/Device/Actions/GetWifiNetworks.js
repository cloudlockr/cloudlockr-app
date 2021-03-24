import BasicRequestHandler from '../Communication/BasicRequestHandler';

export default async () => {
    const requestMessage = {
        "messageType": 5
    };

    const responseMessage = await BasicRequestHandler(requestMessage);

    if (responseMessage.networks === undefined)
        throw 'Received response from device, but was missing the expected networks field';

    var formattedResponse = [];
    for (let i = 0; i < responseMessage.networks.length; i++) {
        formattedResponse.push({ name: responseMessage.networks[i] });
    }

    return formattedResponse;
}
