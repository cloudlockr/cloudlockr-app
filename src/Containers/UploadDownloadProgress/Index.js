import { useTheme } from '@/Theme'
import React, { useState, useCallback } from 'react'
import {
    View,
    Text
} from 'react-native'
import { useSelector } from 'react-redux'
import Spinner from 'react-native-spinkit'
import { Button } from '@/Components'
import ProgressBar from 'react-native-progress/Bar'
import { useFocusEffect } from '@react-navigation/native'
import { navigate } from '@/Navigators/Root'

const useForceUpdate = () => {
    const [, updateState] = useState();
    return useCallback(() => updateState({}), []);
}

const UploadDownloadProgressContainer = () => {
    const { Common, Layout, Colors, Gutters, Fonts } = useTheme();
    const forceUpdate = useForceUpdate();

    const [progress, setProgress] = useState(0);
    const [indeterminate, setIndeterminate] = useState(true);
    const [statusMessage, setStatusMessage] = useState('initializing');
    const [timeRemainingMsg, setTimeRemainingMsg] = useState('tbd');
    const [doneEnabled, setDoneEnabled] = useState(false);

    var bgUpdater;

    const isDownloading = useSelector((state) => state.intention).intention.UploadDownloadProgress_isDownloading;
    const downloadInfo = isDownloading ? useSelector((state) => state.dashboard).downloadInfo : undefined;
    const fileName = isDownloading ? downloadInfo.fileName : useSelector((state) => state.fields).fields['3'];

    const status = useSelector((state) => state.uploadDownloadProgress);

    const doneCallback = () => {
        navigate('Dashboard', {});
    }

    const updateChecker = () => {
        // Obtain the current status by forcing DOM update to read Redux
        forceUpdate();
        console.log(status);

        if (status === undefined) {
            status = { progress: 0, statusMessage: 'initializing', timeRemainingMsg: 'tbd', indeterminate: true};
        }
        
        // Update state where needed
        if (progress !== status.progress)
            setProgress(status.progress);

        if (statusMessage !== status.statusMessage)
            setStatusMessage(status.statusMessage);

        if (timeRemainingMsg !== status.timeRemainingMsg)
            setTimeRemainingMsg(status.timeRemainingMsg);

        if (indeterminate !== status.indeterminate)
            setIndeterminate(status.indeterminate);

        // Handle end conditions
        if (status.progress === 1) {
            // Stop progress updates
            clearInterval(bgUpdater);

            // Enable the done button
            setDoneEnabled(true);
        } 
    }

    // Start upload / download process when view loads
    useFocusEffect(
        React.useCallback(() => {
            if (isDownloading) {
                // Start download process in the background
                //DownloadService();
            } else {
                // Start upload process in the background
                //UploadService();
            }

            // Start background timer to async update status and progress
            bgUpdater = setInterval(updateChecker, 500);

            return () => {
                // Nothing to do when screen is unfocused
            };
        }, [])
    );

    return (
        <View style={[Layout.fill, Common.backgroundSecondaryGreen, Layout.column, Gutters.largexlHPadding, Gutters.largexxxlVPadding, Layout.justifyContentBetween]}>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 250}]}>
                <Spinner isVisible size={150} type={'Bounce'} color={Colors.primary}/>
                <View style={[Layout.column, Layout.alignItemsCenter]}>
                    <Text style={[Fonts.titleExtraDarkWhite, Gutters.tinyBPadding]}>{isDownloading ? 'downloading' : 'uploading'} {fileName}</Text>
                    <Text style={Fonts.smallerDetailLessBoldWhite}>{statusMessage}</Text>
                </View>
            </View>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 60}]}>
                <ProgressBar indeterminate={indeterminate} progress={progress} color={Colors.secondary} unfilledColor={Colors.primary} width={300} height={25} borderRadius={8} useNativeDriver />
                <Text style={Fonts.smallerDetailLessBoldWhite}>est. time remaining: {timeRemainingMsg}</Text>
            </View>
            <View style={[Layout.column, Layout.alignItemsCenter, Layout.justifyContentBetween, {height: 50}]}>
                <Button title={"done"} clickCallback={doneCallback} setEnabled={doneEnabled} useLightStyle style={Layout.fill} />
            </View>
        </View>
    )
}

export default UploadDownloadProgressContainer;
