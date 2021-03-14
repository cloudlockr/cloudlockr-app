import { useTheme } from '@/Theme'
import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { useSelector } from 'react-redux'

const UploadDownloadProgressContainer = (props) => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const isDownloading = props.isDownloading;

    // TODO: retrieve the download information (id, name, fileName if new upload) from the Redux store 

    // TODO: on load, must call the service to start the upload process. Update the state to display that message on the progress indivator. Once the main upload/download 
    //       process begin, start a background timer to call the recalculate service and get the new estimated time and status message from the react store

    return (
        <View style={[Layout.fill, Common.backgroundPrimary, Layout.column]}>
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Layout.fill]} >
                <Text> {isDownloading} </Text>
            </View>
        </View>
    )
}

export default UploadDownloadProgressContainer;
