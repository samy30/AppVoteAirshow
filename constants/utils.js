import { Platform, StatusBar } from "react-native";
import { theme } from "galio-framework";
import { AsyncStorage } from "react-native";

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = theme.SIZES.BASE * 3.5 + (StatusHeight || 0);
export const iPhoneX = () =>
  Platform.OS === "ios" && (height === 812 || width === 812);

export const storeVotedItem = async (index) => {
  try {
    await AsyncStorage.setItem("votedItemIndex", index+"");
    return true;
  } catch (error) {
    // Error saving data
    console.log("ERRROOR" + error);
    return false;
  }
};

export const retrieveVotedItem = async () => {
  try {
    const index = await AsyncStorage.getItem("votedItemIndex");
    console.log(index);
    if (index != null && index!= undefined) {
      // We have data!!
      return index;
    }
    return null;
  } catch (error) {
    // Error retrieving data
    console.log(error);
    return null;
  }
};

export const removeVotedItem = async () => {
  try {
    await AsyncStorage.removeItem("votedItemIndex");
    return true;
  } catch (error) {
    // Error retrieving data
    console.log(error);
    return false;
  }
};

export const fetchParticipants = async () => {
  
}
