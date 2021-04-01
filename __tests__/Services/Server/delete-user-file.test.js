import mockAxios from "jest-mock-axios";
import { DeleteUserFileService } from "../../../src/Services/Server";
import { token, fileId } from "../../../__mocks__/mock-data";

// Mock navigation functions (relevant when expired tokens occur)
import * as m from "../../../src/Navigators/Root";
m.navigateAndSimpleReset = jest.fn();

let testDispatch = jest.fn();

describe("DeleteUserFileService unit tests", () => {
  beforeEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
    testDispatch = jest.fn();
  });

  it("deletes user file on server", async () => {
    let execution = DeleteUserFileService(testDispatch, token, fileId);
    mockAxios.mockResponse({ status: 200, data: { message: "success" } });
    let result = await execution;

    expect(result).toStrictEqual("File was successfully deleted");

    // Check API request was made as intended
    expect(mockAxios.delete).toHaveBeenCalledWith(`file/${fileId}`, {
      headers: {
        Authorization: token.tokenType + " " + token.accessToken,
      },
    });

    // Check that no requests were made using dispatch
    expect(testDispatch.mock.calls.length).toStrictEqual(0);
  });

  it("handles normal server error", async () => {
    let execution = DeleteUserFileService(testDispatch, token, fileId);
    mockAxios.mockError({
      status: 401,
      data: { errors: [{ token: "Invalid token" }] },
    });

    try {
      await execution;
      // Fail test if above expression does not throw anything
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe("Invalid token");
    }

    // Check API request was made as intended
    expect(mockAxios.delete).toHaveBeenCalledWith(`file/${fileId}`, {
      headers: {
        Authorization: token.tokenType + " " + token.accessToken,
      },
    });

    // Check that no requests were made using dispatch
    expect(testDispatch.mock.calls.length).toBe(0);
  });

  it("handles token rejection error (clears local data and logs user out)", async () => {
    let execution = DeleteUserFileService(testDispatch, token, fileId);
    mockAxios.mockError({
      status: 403,
      data: { errors: [{ token: "Expired token" }] },
    });

    try {
      await execution;
      // Fail test if above expression does not throw anything
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBe(
        "You were logged out due to inactivity. Please log back in to access data."
      );
    }

    // Check API request was made as intended
    expect(mockAxios.delete).toHaveBeenCalledWith(`file/${fileId}`, {
      headers: {
        Authorization: token.tokenType + " " + token.accessToken,
      },
    });

    // Check that the request was made to purge user data
    expect(testDispatch.mock.calls.length).toStrictEqual(1);
    expect(testDispatch.mock.calls[0][0]).toStrictEqual({
      type: "PURGE_STORE",
    });

    // Check that navigate to next view was called
    expect(m.navigateAndSimpleReset).toHaveBeenCalledWith("Main");
  });
});
