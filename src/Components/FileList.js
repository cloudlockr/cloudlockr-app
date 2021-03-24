import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import { useTheme } from '@/Theme'
import { useDispatch, useSelector } from 'react-redux'
import ErrorAlert from './ErrorAlert'
import SetDetails from '@/Store/FileTransfer/SetDetails'
import { GetUserFilesService } from '@/Services/Server'

const FileList = (props) => {
  const { Layout, Gutters, Colors, Fonts, Common } = useTheme();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const authToken = useSelector((state) => state.user).token;

  const downloadCallback = props.downloadCallback;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setRefreshing(true);

    var requestedFiles = [];
    try {
      requestedFiles = await GetUserFilesService(authToken);
    } catch (err) {
      ErrorAlert("Error gathering user files", err);
    }

    setRefreshing(false);
    setDataSource(requestedFiles);
  };

  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={[Gutters.largeHPadding, Gutters.regularVPadding, Gutters.tinyxlBMargin, Common.backgroundLightGrey]}>
        <View style={[Layout.row, Layout.rowHCenter, Layout.justifyContentBetween]}>
          <Text style={Fonts.listFileName}>{item.fileName}</Text>
          <View style={[Layout.column, Layout.alignItemsEnd]}>
            <Text style={Fonts.listDetails}>uploaded:</Text>
            <Text style={Fonts.listDetails}>{item.uploadDate}</Text>
          </View>
        </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          dispatch(SetDetails.action(item));
          downloadCallback();
        }}
        style={[{backgroundColor: Colors.secondaryGreen}]}
      />
    );
  };

  return (
    <View style={[Layout.fill, Common.backgroundWhite]}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
            data={dataSource}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            enableEmptySections={true}
            persistentScrollbar={true}
            refreshControl={
              <RefreshControl
                  refreshing={refreshing}
                  onRefresh={getData}
              />
            }
        />
      </View>
  )
}

export default FileList;
