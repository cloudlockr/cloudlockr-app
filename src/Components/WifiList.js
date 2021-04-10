import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import ErrorAlert from "./ErrorAlert";
import { useTheme } from "@/Theme";
import { GetWifiNetworksService } from "@/Services/External";

const WifiList = (props) => {
  const { Layout, Gutters, Fonts, Common } = useTheme();

  const [refreshing, setRefreshing] = useState(true);
  const [dataSource, setDataSource] = useState([]);
  const [selectedName, setSelectedName] = useState("");

  const clickCallback = props.clickCallback;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setRefreshing(true);

    var returnedNetworks;
    try {
      returnedNetworks = await GetWifiNetworksService();
    } catch (err) {
      ErrorAlert("Error fetching nearby networks", err);
    }

    setRefreshing(false);
    setDataSource(returnedNetworks);
  };

  const Item = ({ item, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        [Gutters.largeHPadding, Gutters.regularVPadding, Gutters.tinyxlBMargin],
        selectedName == item.SSID
          ? [Common.backgroundDarkGrey]
          : [Common.backgroundLightGrey],
      ]}
    >
      <View
        style={[Layout.row, Layout.rowHCenter, Layout.justifyContentBetween]}
      >
        <Text style={Fonts.listFileName}>{item.SSID}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          clickCallback(item.SSID);
          setSelectedName(item.SSID);
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
        keyExtractor={(item) => item.SSID}
        enableEmptySections={true}
        persistentScrollbar={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
      />
    </View>
  );
};

export default WifiList;
