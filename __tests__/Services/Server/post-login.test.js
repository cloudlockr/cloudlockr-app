import mockAxios from 'jest-mock-axios';
import { PostLoginService } from '../../../src/Services/Server';
import { token, email, password } from '../../../__mocks__/mock-data';

// Mock navigation functions (relevant when expired tokens occur)
import * as m from '../../../src/Navigators/Root';
m.navigateAndSimpleReset = jest.fn();

let testDispatch = jest.fn();

describe('PostLoginService tests', () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
    testDispatch = jest.fn();
  });

  it('logs the user in with the provided credentials and stores the received token data', async () => { 
    let execution = PostLoginService(email, password, testDispatch);
    mockAxios.mockResponse({ status: 200, data: token });
    await execution;

    // Check API request was made as intended
    expect(mockAxios.post).toHaveBeenCalledWith(`user/login`, {}, { 
        headers: {
            'email': email,
            'password': password
        }
    });

    // Check two dispatchs were made to persist user data
    expect(testDispatch.mock.calls.length).toStrictEqual(2);
    expect(testDispatch.mock.calls[0][0]).toStrictEqual({ payload: email, type: 'user/setEmail'});
    expect(testDispatch.mock.calls[1][0]).toStrictEqual({ payload: token, type: 'user/token/setToken'});
  });

  it('handles normal server error', async () => {
    let execution = PostLoginService(email, password, testDispatch);
    mockAxios.mockError({ status: 401, data: {errors:[{token:'Invalid password'}]}});

    try {
      await execution;
      // Fail test if above expression does not throw anything
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe('Invalid password');
    }

    // Check API request was made as intended
    expect(mockAxios.post).toHaveBeenCalledWith(`user/login`, {}, { 
        headers: {
            'email': email,
            'password': password
        }
    });
    
    // Check that no requests were made using dispatch
    expect(testDispatch.mock.calls.length).toBe(0);
  });
});
