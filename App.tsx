import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppStateWrapper } from "./context/appContext";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <AppStateWrapper>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </AppStateWrapper>
      </SafeAreaProvider>
    );
  }
}
