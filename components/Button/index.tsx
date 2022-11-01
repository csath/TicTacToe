import React from "react";
import {
  Pressable,
  PressableProps,
  Text as DefaultText,
  Text,
} from "react-native";
import styles from "./styles";

type CustomButtonProps = {
  variant?: "Button" | "Link";
  text: string;
  textStyle?: DefaultText["props"]["style"];
} & PressableProps;

const CustomButton = ({
  text,
  variant,
  textStyle,
  ...props
}: CustomButtonProps) => {
  return (
    <Pressable
      style={({ pressed }: { pressed: boolean }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        variant === "Link" ? styles.linkContainer : styles.container,
      ]}
      {...props}
    >
      <Text
        style={[
          variant === "Link" ? styles.linkTitle : styles.title,
          textStyle,
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
