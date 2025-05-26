import { useMainStore } from "@/lib/store";
import { mrhairy } from "@/lib/utils";
import { FontAwesome5 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function TabsLayout() {
  const [loaded] = useFonts({
    NunitoRegular: require("../../assets/fonts/NunitoRegular.ttf"),
    NunitoMedium: require("../../assets/fonts/NunitoMedium.ttf"),
    NunitoSemiBold: require("../../assets/fonts/NunitoSemiBold.ttf"),
    NunitoBold: require("../../assets/fonts/NunitoBold.ttf"),
  });

  const { data } = useQuery({ queryKey: ["token"], queryFn: mrhairy.getToken });

  useEffect(() => {
    if (data) {
      useMainStore.getState().setApikey(data.freetoken);
    }
  }, [data]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          margin: 0,
          height: 75,
          padding: 0,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "NunitoBold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Tools",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="toolbox" size={26} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About",

          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={24} name="info-circle" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(screens)"
        options={{
          headerShown: false,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
