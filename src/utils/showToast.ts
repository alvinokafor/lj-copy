import Toast from "react-native-toast-message";

type ShowToast = {
  type: "success" | "info" | "error";
  title: string;
  body: string;
};

function showToast({ type, title, body }: ShowToast) {
  Toast.show({
    type: type,
    text1: title,
    text2: body,
  });

  return;
}

export default showToast;
