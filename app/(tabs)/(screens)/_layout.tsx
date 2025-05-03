import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="img2link" options={{ headerShown: false }} />
      <Stack.Screen name="fbcover" options={{ headerShown: false }} />
    </Stack>
  );
}
