import React from 'react';
import {
    Text,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useTheme } from '@/Theme'

const DownloadDetail = (props) => {
    const { Layout, Common, Fonts, Images, Gutters } = useTheme();

    var downloadInfo = useSelector((state) => state.dashboard).downloadInfo;

    return (
        <Text>Some Download Modal Content {downloadInfo.id}</Text>
    );
}

module.exports = DownloadDetail;
