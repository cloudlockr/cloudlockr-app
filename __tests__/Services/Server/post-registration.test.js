import mockAxios from "jest-mock-axios";
import { PostRegistrationService } from "../../../src/Services/Server";
import { token, email, password } from "../../../__mocks__/mock-data";

// Mock navigation functions (relevant when expired tokens occur)
import * as m from "../../../src/Navigators/Root";
m.navigateAndSimpleReset = jest.fn();

let testDispatch = jest.fn();

describe("PostRegistrationService unit tests", () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
    testDispatch = jest.fn();
  });

  it("registers the user with the server and stores the returned user data", async () => {
    let execution = PostRegistrationService(
      email,
      password,
      password,
      testDispatch
    );
    mockAxios.mockResponse({ status: 200, data: token });
    await execution;

    // Check API request was made as intended
    expect(mockAxios.post).toHaveBeenCalledWith(
      `user/register`,
      {},
      {
        headers: {
          email: email,
          password: password,
          password1: password,
        },
      }
    );

    // Check two dispatches were made to persist user data
    expect(testDispatch.mock.calls.length).toStrictEqual(2);
    expect(testDispatch.mock.calls[0][0]).toStrictEqual({
      payload: email,
      type: "user/setEmail",
    });
    expect(testDispatch.mock.calls[1][0]).toStrictEqual({
      payload: token,
      type: "user/token/setToken",
    });
  });

  it("handles normal server error", async () => {
    let execution = PostRegistrationService(
      email,
      password,
      password,
      testDispatch
    );
    mockAxios.mockError({
      status: 401,
      data: { errors: [{ token: "Invalid password" }] },
    });

    try {
      await execution;
      // Fail test if above expression does not throw anything
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Invalid password");
    }

    // Check API request was made as intended
    expect(mockAxios.post).toHaveBeenCalledWith(
      `user/register`,
      {},
      {
        headers: {
          email: email,
          password: password,
          password1: password,
        },
      }
    );

    // Check that no requests were made using dispatch
    expect(testDispatch.mock.calls.length).toBe(0);
  });
});
