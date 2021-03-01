import React from 'react';
import {
    Text,
} from 'react-native'
import { useTheme } from '@/Theme'

const UploadDetail = (props) => {
    const { Layout, Common, Fonts, Images, Gutters } = useTheme();

    return (
        <Text>Some Upload Modal Content</Text>
    );
}

module.exports = UploadDetail;
