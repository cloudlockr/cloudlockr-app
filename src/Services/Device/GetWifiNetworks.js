import api, { handleError } from '@/Services'


export default async () => {
    // TODO: Later need to make Bluetooth request to get local wifi networks from the device. The below code should be removed when properly implemented
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        {
            name: 'Network1'
        },
        {
            name: 'Network2'
        },
        {
            name: 'Network3'
        }, 
        {
            name: 'Network4'
        },
        {
            name: 'Network5'
        },
        {
            name: 'Network6'
        },
        {
            name: 'Network7'
        },
    ];
}
