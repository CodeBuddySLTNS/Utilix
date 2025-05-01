import Header from "@/components/header";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image } from "@/components/ui/image";

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
        <Text className="mt-4 text-xl font-nunito-bold">Img2Link</Text>

        <Card className="mt-3 elevation">
          <Text className="text-base font-nunito-regular">
            Img2Link is a powerful tool that allows you to convert images into
            shareable links.
          </Text>
          <Text className="text-base font-nunito-regular mt-2">
            Simply upload your image, and we'll generate a link that you can
            share with anyone. No more worrying about file sizes or email
            attachments!
          </Text>

          <Button className="mt-4" onPress={pickImage}>
            <ButtonText className="font-nunito-bold">Upload Image</ButtonText>
          </Button>
        </Card>

        <Card className="mt-3 elevation">
          <Text className="text-base font-nunito-regular">
            Img2Link is a powerful tool that allows you to convert images into
            shareable links.
          </Text>
          <Text className="text-base font-nunito-regular mt-2">
            Simply upload your image, and we'll generate a link that you can
            share with anyone. No more worrying about file sizes or email
            attachments!
          </Text>

          <Button className="mt-4" onPress={pickImage}>
            <ButtonText className="font-nunito-bold">Upload Image</ButtonText>
          </Button>
        </Card>

        <Card className="my-4 elevation">
          {image && (
            <Image
              size="full"
              className="h-60"
              resizeMode="contain"
              source={{ uri: image }}
              alt="img"
            />
          )}
        </Card>
      </ScrollView>
    </View>
  );
}
