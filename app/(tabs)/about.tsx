import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/header";
import { Image } from "@/components/ui/image";

const About = () => {
  return (
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full pt-8 px-4 pb-5 elevation bg-white">
          <Image
            size="full"
            className="h-20"
            resizeMode="contain"
            source={require("@/assets/images/utilix-trans.png")}
            alt="logo"
          />
          <Text className="text-xl mt-1 font-nunito-medium text-center">
            Simplify Everything.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
