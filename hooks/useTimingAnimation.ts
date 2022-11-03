import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function useTimingAnimation(duration: number = 1000): {
  timingAnim: Animated.Value;
  restart: () => void;
} {
  const timingAnim = useRef(new Animated.Value(0)).current;

  const animate = () => {
    Animated.timing(timingAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const restart = () => {
    timingAnim.setValue(0);
    animate();
  };

  useEffect(() => {
    animate();
  }, []);

  return { timingAnim, restart };
}
