import { useTheme } from '@/Theme'
import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    BackHandler
} from 'react-native'
import { DashboardHeader, FileList, DownloadDetail, UploadDetail } from '@/Components'
import { useSelector } from 'react-redux'
import RBSheet from 'react-native-raw-bottom-sheet'

// Forces a view update (which allows for the downloadClicked state to be updated)
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

const DashboardContainer = () => {
    const { Common, Layout, Colors } = useTheme();
    const refRBSheet = useRef();
    const forceUpdate = useForceUpdate();

    // Update downloadClicked with state data
    var downloadClicked = useSelector((state) => state.dashboard).downloadClicked;

    // Prevent user from going back to login view via back button press
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, []);

    // Update callback function
    const updateCallback = () => {
        forceUpdate();
        refRBSheet.current.open();
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <DashboardHeader updateCallback={updateCallback} />
            <FileList updateCallback={updateCallback} />

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                wrapper: {
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
                container: {
                    backgroundColor: Colors.secondaryGreen,
                },
                draggableIcon: {
                    backgroundColor: Colors.primary,
                }
                }}
            >
                {downloadClicked ? <DownloadDetail /> : <UploadDetail />}
          </RBSheet>
        </View>
    )
}

export default DashboardContainer;
