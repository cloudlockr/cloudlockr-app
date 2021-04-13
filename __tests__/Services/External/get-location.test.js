import { GetLocationService } from "../../../src/Services/External";

// Mock the location API
jest.mock("react-native-geolocation-service");
import Geolocation from "react-native-geolocation-service";

describe("GetLocationService unit tests", () => {
  it("gets location successfully, formatting response as expected", async () => {
    Geolocation.getCurrentPosition.mockImplementation(
      async (resolve, reject) => {
        resolve({
          coords: {
            latitude: 1.1234567,
            longitude: 2.1234567,
            altitude: 3.1234567,
          },
        });
      }
    );

    var response = await GetLocationService();

    // Should return values as latitude|longitude|altitude with 3 decimal places of precision
    expect(response).toBe("1.123|2.123|3.123");
  });

  it("passes error upwards", async () => {
    Geolocation.getCurrentPosition.mockImplementation(
      async (resolve, reject) => {
        reject("error occurred");
      }
    );

    try {
      await GetLocationService();

      // Should have failed by now
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toStrictEqual("error occurred");
    }
  });
});
