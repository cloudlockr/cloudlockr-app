import mockAxios from 'jest-mock-axios';
import { PostLogoutService } from '../../../src/Services/Server';
import { token } from '../../../__mocks__/mock-data';

// Mock navigation functions (relevant when expired tokens occur)
import * as m from '../../../src/Navigators/Root';
m.navigateAndSimpleReset = jest.fn();

let testDispatch = jest.fn();

describe('PostLogoutService tests', () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
    testDispatch = jest.fn();
  });

  it('logs the user out and clears data', async () => { 
    let execution = PostLogoutService(token, testDispatch);
    mockAxios.mockResponse({ status: 200, data: 'success' });
    await execution;

    // Check API request was made as intended
    expect(mockAxios.post).toHaveBeenCalledWith(`user/logout`, {}, { 
        headers: {
            'authorization': token.tokenType + ' ' + token.accessToken,
            'refreshToken': token.refreshToken
        }
    });

    // Check that the request was made to purge user data
    expect(testDispatch.mock.calls.length).toStrictEqual(1);
    expect(testDispatch.mock.calls[0][0]).toStrictEqual({ type: 'PURGE_STORE' });
  });

  it('handles normal server error (still logs user out and clears data)', async () => {
    let execution = PostLogoutService(token, testDispatch);
    mockAxios.mockError({ status: 401, data: {errors:[{token:'Invalid token'}]}});
    await execution;

    // Check API request was made as intended
    expect(mockAxios.post).toHaveBeenCalledWith(`user/logout`, {}, { 
        headers: {
            'authorization': token.tokenType + ' ' + token.accessToken,
            'refreshToken': token.refreshToken
        }
    });
    
    // Check that the request was made to purge user data (even though there was an error)
    expect(testDispatch.mock.calls.length).toStrictEqual(1);
    expect(testDispatch.mock.calls[0][0]).toStrictEqual({ type: 'PURGE_STORE' });
  });

  it('handles token rejection error (clears local data and logs user out)', async () => {
    let execution = PostLogoutService(token, testDispatch);
    mockAxios.mockError({ status: 403, data: {errors:[{token:'Expired token'}]}});
    await execution;

    // Check API request was made as intended
    expect(mockAxios.post).toHaveBeenCalledWith(`user/logout`, {}, { 
        headers: {
            'authorization': token.tokenType + ' ' + token.accessToken,
            'refreshToken': token.refreshToken
        }
    });
    
    // Check that the request was made to purge user data
    expect(testDispatch.mock.calls.length).toStrictEqual(1);
    expect(testDispatch.mock.calls[0][0]).toStrictEqual({ type: 'PURGE_STORE' });
  });
});
