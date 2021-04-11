import WifiManager from "react-native-wifi-reborn";

export default async () => {
  const foundNetworks = await WifiManager.loadWifiList();

  // Filter networks to prevent duplicates and invalid ones
  var seen = {};
  var uniqueNetworks = foundNetworks.filter((item) => {
    var isNew = seen[item.SSID] === undefined;
    seen[item.SSID] = true;

    var validNetworkType =
      item.capabilities.includes("WPA-PSK") ||
      item.capabilities.includes("WPA2-PSK");

    var is5G = item.SSID.includes("5G") || item.SSID.includes("5g");

    return isNew && validNetworkType && !is5G;
  });

  return uniqueNetworks;
};
