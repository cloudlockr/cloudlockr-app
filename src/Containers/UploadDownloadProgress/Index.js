import { useTheme } from '@/Theme'
import React, { useState } from 'react'
import {
    View,
    Text
} from 'react-native'
import { useSelector } from 'react-redux'
import Spinner from 'react-native-spinkit'
import { Button } from '@/Components'
import ProgressBar from 'react-native-progress/Bar'
import { navigate } from '@/Navigators/Root'

const UploadDownloadProgressContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();

    const [progress, setProgress] = useState(0);
    const [indeterminate, setIndeterminate] = useState(true);
    const [statusMessage, setStatusMessage] = useState('initializing');
    const [timeRemainingMsg, setTimeRemainingMsg] = useState('30 sec');
    const [doneEnabled, setDoneEnabled] = useState(false);

    const isDownloading = useSelector((state) => state.intention).intention.UploadDownloadProgress_isDownloading;
    const downloadInfo = isDownloading ? useSelector((state) => state.dashboard).downloadInfo : undefined;
    const fileName = isDownloading ? downloadInfo.fileName : useSelector((state) => state.fields).fields['3'];

    const doneCallback = () => {
        navigate('Dashboard', {});
    }

    // TODO: on load, must call the service to start the upload process. Update the state to display that message on the progress indivator. Once the main upload/download 
    //       process begin, start a background timer to call the recalculate service and get the new estimated time and status message from the react store

    return (
        <View style={[Layout.fill, Common.backgroundSecondaryGreen, Layout.column]}>
            <View style={[Layout.column, Layout.center, Gutters.largexlHPadding, Gutters.largexxxlVPadding, Layout.fill, Layout.justifyContentBetween]} >
                <View style={[Gutters.largexxlBMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 250}]}>
                    <Spinner isVisible size={150} type={'Bounce'} color={Colors.primary}/>
                    <View style={[Layout.column, Layout.alignItemsCenter]}>
                        <Text style={[Fonts.titleExtraDarkWhite, Gutters.tinyBPadding]}>{isDownloading ? 'downloading' : 'uploading'} {fileName}</Text>
                        <Text style={Fonts.smallerDetailLessBoldWhite}>{statusMessage}</Text>
                    </View>
                </View>
                <View style={[Gutters.largexxlBMargin, Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 60}]}>
                    <ProgressBar indeterminate={indeterminate} progress={progress} color={Colors.secondary} unfilledColor={Colors.primary} width={300} height={25} borderRadius={8} useNativeDriver />
                    <Text style={Fonts.smallerDetailLessBoldWhite}>est. time remaining: {timeRemainingMsg}</Text>
                </View>
                <Button title={"done"} clickCallback={doneCallback} setEnabled={doneEnabled} useLightStyle style={Layout.fill} />
            </View>
        </View>
    )
}

export default UploadDownloadProgressContainer;
