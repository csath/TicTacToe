import React from "react";
import { TextInput as RNTextInput, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import styles from "./styles";

type CustomTextInputProps = {
  title: string;
  titleStyle?: Text["props"]["style"];
} & RNTextInput["props"];

const TextInput = ({
  title,
  titleStyle,
  style,
  ...props
}: CustomTextInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <RNTextInput
        style={[styles.textInput, style]}
        placeholderTextColor={Colors.textDim}
        {...props}
      />
    </View>
  );
};

export default TextInput;
