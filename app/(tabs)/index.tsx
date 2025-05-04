import Header from "@/components/header";
import { Pressable, Text, View } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Divider } from "@/components/ui/divider";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 px-3">
        <View className="p-2 pb-3 mt-4 rounded elevation bg-white">
          <View className="flex-row justify-between items-center">
            <Text className="font-nunito-bold text-xl text-gray-900">
              Featured Tools
            </Text>
            <Text className="font-nunito-medium text-gray-700">View All</Text>
          </View>
          <Divider className="mt-0.5 mb-2" />
          <HStack space="sm" className="h-20">
            <Pressable
              className="flex-1 p-2 justify-center items-center bg-gray-100 rounded"
              onPress={() => router.replace("/(tabs)/(screens)/img2link")}
            >
              <FontAwesome5 name="image" size={24} color="black" />
              <Text className="font-nunito-regular">Img2Link</Text>
            </Pressable>

            <Pressable
              className="flex-1 justify-center items-center bg-gray-100 rounded"
              onPress={() => router.replace("/(tabs)/(screens)/fbcover")}
            >
              <FontAwesome5 name="facebook-square" size={24} color="black" />
              <Text className="font-nunito-regular text-center">
                FB Cover Maker
              </Text>
            </Pressable>
          </HStack>
        </View>
      </View>
    </View>
  );
}
