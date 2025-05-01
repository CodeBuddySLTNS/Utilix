import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView className="flex-1">
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaView>
    </GluestackUIProvider>
  );
}
