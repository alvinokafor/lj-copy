import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);

    return await AsyncStorage.setItem(`@lovejollof_${key}`, jsonValue);
  } catch (e) {
    console.log("Saving error: ", e);
    return null;
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@lovejollof_${key}`);
    const decryptedData = JSON.parse(jsonValue!);

    return decryptedData;
  } catch (e) {
    // error reading value
    console.log(`reading error for ${key}`, e);
    return null;
  }
};

export const clearData = async (key: string) => {
  await AsyncStorage.removeItem(`@lovejollof_${key}`);
};
