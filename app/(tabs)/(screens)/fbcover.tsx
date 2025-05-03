import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { ScrollView, Text, View } from "react-native";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { deku } from "@/lib/utils";
import { useState } from "react";
import { FBCoverInput } from "@/types/fbcover.types";
import { Image } from "@/components/ui/image";
import { Buffer } from "buffer";

global.Buffer = Buffer;

export default function Index() {
  const [link, setLink] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null>(null);
  const [value, setValue] = useState<FBCoverInput>({
    template: "",
    id: 758,
    name: "MrHairy",
    subName: "Dev",
    color: "blue",
  });

  const generateFbCover = async () => {
    try {
      const response = await deku.fbCover(
        `/canvas/fbcoverv2?name=${value.name}&id=${value.id}&subname=${value.subName}&color=${value.color}`
      );

      const reader = new FileReader();
      reader.onload = () => {
        if (
          reader.result &&
          typeof reader.result === "string" &&
          reader.result.startsWith("data:application/json")
        ) {
          const text = reader.result;
          const json = JSON.parse(text); // sadya ko to para pag mag throw ng exception matik image yung data
          setError(json);
          console.log("Error generating fbcover:", json);
        } else {
          // console.log(reader.result.split(",")[0]);
          setLink(reader.result);
        }
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1">
      <Header />
      <ScrollView className="px-3">
        <Card className="mt-3 elevation">
          <Text className="text-base font-nunito-regular">
            <Text className="font-nunito-bold text-lg">FB Cover Maker</Text> is
            a tool to create Facebook cover images. It provides a simple and
            intuitive interface for customizing your cover photo.
          </Text>
          <Text className="text-base font-nunito-regular mt-2">
            To get started, simply choose from a variety of templates and styles
            to suit your preferences. Once you've made your selection, you can
            customize the canvas by adding text, images, and changing colors.
          </Text>
        </Card>

        <Card className="mt-4 elevation">
          <View className="">
            <Text className="font-nunito-semibold">FB Cover Template:</Text>
            <Select className="mt-1">
              <SelectTrigger
                variant="outline"
                size="md"
                className="justify-between items-center"
              >
                <SelectInput
                  placeholder="Select option"
                  className="font-nunito-regular pt-0 mt-2.5"
                />
                <SelectIcon className="mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="FB Cover v1" value="v1" />
                  <SelectItem
                    className="font-nunito-regular text-3xl"
                    label="FB Cover v2"
                    value="v2"
                  />
                  <SelectItem label="FB Cover v3" value="v3" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </View>

          <View className="mt-2">
            <Text className="font-nunito-semibold">First Name:</Text>
            <Input className="mt-1">
              <InputField
                className="font-nunito-regular"
                placeholder="Enter your first name"
              />
            </Input>
          </View>

          <View className="mt-2">
            <Text className="font-nunito-semibold">Last Name:</Text>
            <Input className="mt-1">
              <InputField
                className="font-nunito-regular"
                placeholder="Enter your last name"
              />
            </Input>
          </View>

          <View className="mt-2">
            <Text className="font-nunito-semibold">Color:</Text>
            <Input className="mt-1">
              <InputField
                className="font-nunito-regular outline-cyan-100"
                placeholder="Default: White"
              />
            </Input>
          </View>

          <Button className="mt-3" onPress={generateFbCover}>
            <ButtonText className="font-nunito-bold">
              Create FB Cover
            </ButtonText>
          </Button>
        </Card>

        <Card className="mt-4 mb-8 elevation">
          <View className="h-52">
            {link && typeof link === "string" ? (
              <Image
                size="full"
                source={{
                  uri: link,
                }}
                resizeMode="contain"
                alt="generated image"
              />
            ) : (
              <View className="w-full h-full items-center justify-center bg-gray-200 rounded">
                <Text className="font-nunito-regular text-center text-gray-500">
                  Your FB Cover will be generated here.
                </Text>
              </View>
            )}
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
