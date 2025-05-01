import Header from "@/components/header";
import { Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image } from "@/components/ui/image";
import { Button, ButtonText } from "@/components/ui/button";

export default function Index() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="flex-1">
      <Header />
      <View className="flex-12">
        <Button size="md" onPress={pickImage}>
          <ButtonText>Pick an image.</ButtonText>
        </Button>
        {image && <Image source={{ uri: image }} />}
      </View>
    </View>
  );
}
