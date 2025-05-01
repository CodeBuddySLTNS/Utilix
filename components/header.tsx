import { View, Text } from "react-native";
import React from "react";
import { Image } from "./ui/image";

const Header = () => {
  return (
    <View className="w-full p-3 bg-white elevation-md">
      <View className="w-[70px]">
        <Image
          size="none"
          className="h-[30px]"
          resizeMode="contain"
          source={require("@/assets/images/utilix-trans.png")}
          alt="logo"
        />
      </View>
    </View>
  );
};

export default Header;
