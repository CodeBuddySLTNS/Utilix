import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "@/components/header";
import { Image } from "@/components/ui/image";

const About = () => {
  return (
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1">
          <View className="w-full pt-8 px-4 pb-5 elevation bg-white">
            <Image
              size="full"
              className="h-20"
              resizeMode="contain"
              source={require("@/assets/images/utilix-trans.png")}
              alt="logo"
            />
            <Text className="text-xl mt-1 font-nunito-medium text-center">
              Where creativity meets utility.
            </Text>
          </View>
          <View className="p-4 ">
            <Text className="text-base font-nunito-regular">
              <Text className="text-xl font-nunito-bold">Utilix</Text> brings
              together the essential tools you need in one powerful, easy-to-use
              app. Whether you're designing, chatting with AI, downloading
              content, or streamlining your daily tasks, Utilix helps you get
              more done without switching between multiple platforms.
            </Text>
            <Text className="text-base font-nunito-regular mt-2">
              With a sleek and intuitive interface, Utilix is designed to
              enhance your productivity and creativity. Our app is packed with
              features that make it easy to stay organized, collaborate with
              others, and access the resources you need—all in one place.
            </Text>
          </View>
        </View>

        <View className="p-4">
          <Text className="font-nunito-regular text-center">
            All rights reserved © 2025 Utilix.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
