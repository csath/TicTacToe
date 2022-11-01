import React, { useEffect } from "react";
import { Text, View, Animated } from "react-native";
import useTimingAnimation from "../../hooks/useTimingAnimation";
import styles from "./styles";

type HeaderProps = {
  text: string;
  replayAnimation: string;
  animationDuration?: number;
  wrapperStyle?: View["props"]["style"];
  style?: Text["props"]["style"];
} & Text["props"];

const Header = ({
  text,
  wrapperStyle,
  animationDuration,
  style,
  replayAnimation,
  ...props
}: HeaderProps) => {
  const { timingAnim, restart } = useTimingAnimation(animationDuration || 300);

  useEffect(() => {
    restart();
  }, [replayAnimation]);

  return (
    <View style={[styles.container, wrapperStyle]}>
      <Animated.Text
        style={[
          styles.title,
          style,
          {
            transform: [
              {
                translateY: timingAnim.interpolate({
                  inputRange: [0, 0.25, 0.5, 0.75, 1],
                  outputRange: [0, 8, 0, -8, 0],
                }),
              },
            ],
          },
        ]}
        {...props}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

export default Header;
