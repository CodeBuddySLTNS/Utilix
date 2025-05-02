import Header from "@/components/header";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pressable, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image } from "@/components/ui/image";
import { Icon } from "@/components/ui/icon";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Img2Link() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 1,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView className="px-4">
        {/* <Text className="mt-4 text-xl font-nunito-bold">Img2Link</Text> */}

        <Card className="mt-3 elevation">
          <Text className="text-base font-nunito-regular">
            <Text className="font-nunito-bold text-lg">Img2Link</Text> is a
            powerful tool that allows you to convert images into shareable links
            using imgur.
          </Text>
          <Text className="text-base font-nunito-regular mt-2">
            Simply upload your image, and we'll generate a link that you can
            share with anyone. No more worrying about file sizes or email
            attachments!
          </Text>

          {/* <Button className="mt-4" onPress={pickImage}>
            <ButtonText className="font-nunito-bold">Upload Image</ButtonText>
          </Button> */}
        </Card>

        <Card className="my-4 elevation">
          {image ? (
            <View className="rounded bg-gray-200">
              <Image
                size="full"
                className="h-60"
                resizeMode="contain"
                source={{ uri: image }}
                alt="img"
              />
            </View>
          ) : (
            <Pressable
              onPress={pickImage}
              className="h-60 justify-center items-center bg-gray-200 rounded"
            >
              <Text className="text-lg font-nunito-semibold">
                Choose image from camera roll.
              </Text>
            </Pressable>
          )}
          <View className="mt-4">
            <Button disabled={!image} className={`${!image && "bg-gray-100"}`}>
              <ButtonText
                className={`font-nunito-regular ${!image && "text-gray-400"}`}
              >
                Generate Link
              </ButtonText>
            </Button>
          </View>
        </Card>
        <Card className="mb-4 elevation">
          <View className="w-full flex-row justify-between items-center rounded bg-gray-100">
            <View className="w-9 p-2 items-center justify-center bg-gray-200 rounded-l">
              <FontAwesome5 name="link" size={18} color="black" />
            </View>
            <Text
              className="font-nunito-regular flex-1 px-1.5"
              numberOfLines={1}
            >
              http://yourlink.comhttp://yourlink.comhttp://yourlink.comhttp://yourlink.com
            </Text>
            <View className="w-9 p-2 items-center justify-center bg-gray-200 rounded-r">
              <FontAwesome5 name="copy" size={18} />
            </View>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
