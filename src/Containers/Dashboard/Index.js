import { useTheme } from '@/Theme'
import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    BackHandler
} from 'react-native'
import { DashboardHeader, FileList, DownloadDetail, UploadDetail } from '@/Components'
import { useSelector } from 'react-redux'
import RBSheet from 'react-native-raw-bottom-sheet'

const DashboardContainer = () => {
    const { Common, Layout, Colors } = useTheme();
    const uploadRBSheet = useRef();
    const downloadRBSheet = useRef();

    // Prevent user from going back to login view via back button press
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true);
    }, []);

    // Update callback function
    const downloadCallback = () => {
        // TODO: Will have to add logic to interface with service to send bluetooth message to generate HEX code
        downloadRBSheet.current.open();
    }
    const uploadCallback = () => {
        // TODO: Will have to add logic to interface with service to send bluetooth message to generate HEX code
        uploadRBSheet.current.open();
    }

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <DashboardHeader uploadCallback={uploadCallback} />
            <FileList downloadCallback={downloadCallback} />

            <RBSheet
                ref={downloadRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={340}
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
                <DownloadDetail />
            </RBSheet>
            <RBSheet
                ref={uploadRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={470}
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
                <UploadDetail />
            </RBSheet>
        </View>
    )
}

export default DashboardContainer;
