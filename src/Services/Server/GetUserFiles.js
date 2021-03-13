export default async (authToken) => {
    // TODO: Need to uncomment API request once API is ready. The uncommented code should be removed when properly implemented
    // if (!authToken) {
    //     return handleError({ message: 'Authentication token (authToken) must be passed as a parameter' });
    // }
    // const response = await api.get(`user/files`);
    // return response.data;
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    return [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          fileName: 'secret1.pdf',
          uploadDate: 'Jan 28, 2021'
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          fileName: 'secret2.pdf',
          uploadDate: 'Jan 28, 2021'
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          fileName: 'secret3.pdf',
          uploadDate: 'Jan 28, 2021'
        },
    ];
}
