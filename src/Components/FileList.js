import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, RefreshControl, ActivityIndicator, Button } from 'react-native'
import { useTheme } from '@/Theme'
import { useDispatch } from 'react-redux'
import SetDownloadInfo from '@/Store/Dashboard/SetDownloadInfo'

const FAKE_DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fileName: 'secret1.pdf',
      uploadDate: 'Jan 28, 2021'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      fileName: 'secret2.pdf',
      uploadDate: 'Jan 28, 2021'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      fileName: 'secret3.pdf',
      uploadDate: 'Jan 28, 2021'
    },
  ];

const FileList = (props) => {
  const { Layout, Gutters, Colors, Fonts, Common } = useTheme();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(true);
  const [dataSource, setDataSource] = useState([]);

  const downloadCallback = props.downloadCallback;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // TODO: Change this to collect data from the service layer (which will then make requests)
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    setDataSource(FAKE_DATA);
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
          dispatch(SetDownloadInfo.action(item));
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
