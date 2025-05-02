import Header from "@/components/header";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";
import { Image } from "@/components/ui/image";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

const IMGUR_CLIENT_ID = "01c66d90e75c45c";

export default function Img2Link() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [link, setLink] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      selectionLimit: 1,
      base64: true,
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const generateLink = async (uri: string | null | undefined) => {
    if (!uri) return;

    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await axios.post(
      "https://api.imgur.com/3/image",
      { image: base64, type: "base64" },
      {
        headers: {
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setLink(response.data.data.link);
    }
    if (response.status !== 200) {
      setLink(null);
    }
    setImage(null);
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Copied to clipboard", text);
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
        </Card>

        <Card className="my-4 elevation">
          {image ? (
            <Pressable onPress={pickImage} className="h-60 rounded bg-gray-200">
              <Image
                size="full"
                resizeMode="contain"
                source={{ uri: image.uri }}
                alt="img"
              />
            </Pressable>
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
            <Button
              disabled={!image}
              onPress={() => generateLink(image?.uri)}
              className={`${!image && "bg-gray-100"}`}
            >
              <ButtonText
                className={`font-nunito-regular ${!image && "text-gray-400"}`}
              >
                Generate Link
              </ButtonText>
            </Button>
          </View>
        </Card>
        <Card className="mb-4 elevation">
          {link ? (
            <View className="w-full flex-row justify-between items-center rounded bg-gray-100">
              <View className="w-9 p-2 items-center justify-center bg-gray-200 rounded-l">
                <FontAwesome5 name="link" size={18} color="black" />
              </View>
              <Text
                className="font-nunito-regular flex-1 px-1.5"
                numberOfLines={1}
              >
                {link}
              </Text>
              <Pressable
                onPress={() => copyToClipboard(link)}
                className="w-9 p-2 items-center justify-center bg-gray-200 rounded-r"
              >
                <FontAwesome5 name="copy" size={18} />
              </Pressable>
            </View>
          ) : (
            <Text className="font-nunito-regular text-gray-500 text-center">
              Your link will be generated here.
            </Text>
          )}
        </Card>
      </ScrollView>
    </View>
  );
}
