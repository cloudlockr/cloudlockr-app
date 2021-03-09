# CloudLockr Android App
### Project Overview
This repo contains the Android application code facilitating the CloudLockr device user interface featuring bluetooth communication, API server integration, and file reconstruction. Powered by React Native with Redux, Axios, and Jest.

---

### How to simulate on an Android Virtual Device (AVD)
1. Launch an AVD emulator (Pixel 3 API 29, Android 10.0) using Android Studio in the Android Virtual Device Manager window
2. In a terminal window in the project root directory, execute `yarn start`
    - This will start the React Native server
3. In a different terminal window also in the project root directory, execute `yarn android`
    - This will load the app onto the running AVD emulator

**Note:** All features related to bluetooth communcation within the app will likely not be usable as they require communicating through the phone's bluetooth hardware to the CloudLockr device.
