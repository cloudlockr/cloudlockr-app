# CloudLockr — React Native Android App

## Project Overview

CloudLockr is an innovative data storage system, tieing your digital data to a physical location while providing secure remote backup storage. The 7 strong layers of protection CloudLockr offers ensures your data is never compromised or read by anyone else, including us.

This repo contains the Android application facilitating the CloudLockr device user interface. This codebase features custom bluetooth communication protocols, API integration, file reconstruction, and user management.

#### Demo (note: lower visual quality and FPS than actual):

<img src="./.docs/demo.gif" width="250">

#### Screenshots

|                                 |                                 |                                 |                                 |
| :-----------------------------: | :-----------------------------: | :-----------------------------: | :-----------------------------: |
| ![Screenshot 1](./.docs/s1.png) | ![Screenshot 2](./.docs/s2.png) | ![Screenshot 3](./.docs/s3.png) | ![Screenshot 4](./.docs/s4.png) |

#### Main Technologies

- React Native
- Jest (testing)
- Axios (remote API connection)
- Redux (data storage)
- react-native-bluetooth-classic (bluetooth communication)
- react-native-fs (file system interaction)
- react-navigation (view navigation)

---

## Execution Details

#### Project Requirements

- npm
- yarn (latest)

#### How to Simulate on an Android Virtual Device (AVD)

1. Execute `yarn install` (if you have not already)
2. Launch an AVD emulator (Pixel 3 API 29, Android 10.0) using Android Studio in the Android Virtual Device Manager window
3. In a terminal window in the project root directory, execute `yarn start`
   - This will start the React Native Metro server
4. In a different terminal window also in the project root directory, execute `yarn android`
   - This will load the app onto the running AVD emulator

**Note:** All features related to bluetooth communcation within the app will likely not be usable as they require communicating through the phone's bluetooth hardware to the CloudLockr device. To test the app with mocked bluetooth connection, set `mocking.deviceConnection = true` in `src/Config/index.js`.

#### Running Tests

Execute `yarn test` to run the entire test suite (UI and service logic tests). Verbose results are enabled by default for result clarity.

---

## Technical Details

#### Directory Structure

Note that throughout the project `@/` is used in import statements and translates to `src` (to enhance code readability). Also note that `index.js` files are used throughout the project to simplify imports and provide a defined interface to a given directory. The general concept of the directory structure is to seperate logic from UI components, enhancing testability and modularity.

- `__tests__` (Jest unit/integration/UI tests)
- `src` (source code)
  - `Assets` (resources used throughout code. Assets are imported in `Theme` and usable through there. Do not import assets directly from here in the UI)
  - `Components`
  - `Config` (constant application variables)
  - `Containers` (top level containers for UI views)
  - `Modals` (special containers for pop-up modals views)
  - `Navigators` (app view navigation handling)
  - `Services` (complex logic, any computations)
    - `Device` (services related to device interaction)
    - `FileSystem` (services related to local phone file system or file manipulation)
    - `FileTransfer` (top-level services that faciliate complex file transfer processes)
    - `Server` (services related to server interaction)
    - Note that these files throw errors that the UI must catch (and show to the user if applicable)
  - `Store` (Redux interaction, further broken up by Redux slice indicated by each sub-directory)
  - `Theme` (options effecting style, including assets, fonts, and colours. Import `useTheme()` method in UI to access theme data)
