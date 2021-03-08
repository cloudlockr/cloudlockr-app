import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import { useTheme } from '@/Theme'

const FAKE_DATA = [
    {
      name: 'Network1'
    },
    {
      name: 'Network2'
    },
    {
      name: 'Network3'
    }, 
    {
      name: 'Network4'
    },
    {
      name: 'Network5'
    },
    {
      name: 'Network6'
    },
    {
      name: 'Network7'
    },
  ];

const WifiList = (props) => {
  const { Layout, Gutters, Colors, Fonts, Common } = useTheme();

  const [refreshing, setRefreshing] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [selectedName, setSelectedName] = useState('');

  const clickCallback = props.clickCallback;

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
    <TouchableOpacity onPress={onPress} style={[[Gutters.largeHPadding, Gutters.regularVPadding, Gutters.tinyxlBMargin], selectedName == item.name ? [Common.backgroundDarkGrey] : [Common.backgroundLightGrey]]}>
        <View style={[Layout.row, Layout.rowHCenter, Layout.justifyContentBetween]}>
          <Text style={Fonts.listFileName}>{item.name}</Text>
        </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          clickCallback(item.name);
          setSelectedName(item.name);
        }}
      />
    );
  };

  return (
    <View style={[Layout.fill, Common.backgroundWhite]}>
        {refreshing ? <ActivityIndicator /> : null}
        <FlatList
            data={dataSource}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            enableEmptySections={true}
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

export default WifiList;
