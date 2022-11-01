import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import ScoreScreen from "../screens/ScoreScreen";
import GameBoardScreen from "../screens/GameBoardScreen";
import PlayerScreen from "../screens/PlayerScreen";
import { RootStackParamList } from "../types";
import Colors from "../constants/Colors";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Player"
        component={PlayerScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameBoard"
        component={GameBoardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Scores"
          component={ScoreScreen}
          options={{
            headerTitle: "Standings",
            headerBackButtonMenuEnabled: true,
            headerTintColor: Colors.text,
            headerStyle: {
              backgroundColor: Colors.background,
            },
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}
