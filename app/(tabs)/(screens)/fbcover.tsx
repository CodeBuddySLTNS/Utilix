import Header from "@/components/header";
import { Card } from "@/components/ui/card";
import { Pressable, ScrollView, Text, View } from "react-native";
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
import { useCallback, useState } from "react";
import { FBCoverInput } from "@/types/fbcover.types";
import { Image } from "@/components/ui/image";
import ImagePreview from "@/components/image-preview";

export default function Index() {
  const [preview, setPreview] = useState<{ show: boolean }>({ show: false });
  const [link, setLink] = useState<string | ArrayBuffer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ code: string } | null>(null);
  const [inputError, setInputError] = useState<{
    name: string;
    subName: string;
  }>({ name: "", subName: "" });
  const [value, setValue] = useState<FBCoverInput>({
    template: "v1",
    id: "",
    name: "",
    subName: "",
    color: "",
  });

  const validateInputs = () => {
    let error = false;
    if (!value.name) {
      setInputError((prev) => ({ ...prev, name: "First Name is required" }));
      error = true;
    }
    if (!value.subName) {
      setInputError((prev) => ({ ...prev, subName: "Last Name is required" }));
      error = true;
    }
    return !error;
  };

  const generateFbCover = async () => {
    if (validateInputs()) {
      try {
        setLoading(true);
        const response = await deku.fbCover(
          `/canvas/fbcoverv2?&id=${value.id || 5}&name=${value.name}&subname=${
            value.subName
          }&color=${value.color.trim() || "blue"}`
        );

        const reader = new FileReader();
        reader.onload = () => {
          // console.log(reader.result.split(",")[0]);
          setLink(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.log(error);
        setError({ code: (error as { code: string }).code });
      }
      setLoading(false);
    } else {
      setError(null);
    }
  };

  return (
    <View className="flex-1">
      <Header />
      <ImagePreview
        uri={link}
        show={preview.show}
        close={useCallback(() => {
          setPreview((prev) => ({ ...prev, show: false }));
        }, [])}
      />
      <ScrollView>
        <View className="px-3">
          <Card className="mt-3 elevation">
            <Text className="text-base font-nunito-regular">
              <Text className="font-nunito-bold text-lg">FB Cover Maker</Text>{" "}
              is a tool to create Facebook cover images. It provides a simple
              and intuitive interface for customizing your cover photo.
            </Text>
            <Text className="text-base font-nunito-regular mt-2">
              To get started, simply choose from a variety of templates and
              styles to suit your preferences. Once you've made your selection,
              you can customize the canvas by adding text, images, and changing
              colors.
            </Text>
          </Card>

          <Card className="mt-4 elevation">
            <View className="">
              <Text className="font-nunito-semibold">FB Cover Template:</Text>
              <Select
                className="mt-1"
                selectedValue={value.template}
                onValueChange={(value) =>
                  setValue((prev) => ({ ...prev, template: value }))
                }
              >
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
                    <SelectItem label="FB Cover v2" value="v2" />
                    <SelectItem label="FB Cover v3" value="v3" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </View>

            <View className="mt-2">
              <Text className="font-nunito-semibold">Image Id:</Text>
              <Input className="mt-1">
                <InputField
                  className="font-nunito-regular"
                  placeholder="Enter a number from 0 - 845 (default: 5)"
                  inputMode="numeric"
                  onChangeText={(text) =>
                    setValue((prev) => ({ ...prev, id: text }))
                  }
                />
              </Input>
            </View>

            <View className="mt-2">
              <Text className="font-nunito-semibold">First Name:</Text>
              <Input className="mt-1">
                <InputField
                  className="font-nunito-regular"
                  placeholder="Enter your first name"
                  onChangeText={(text) => {
                    setValue((prev) => ({ ...prev, name: text }));
                    setInputError((prev) => ({ ...prev, name: "" }));
                  }}
                />
              </Input>
              {inputError.name && (
                <Text className="font-nunito-regular mt-0.5 text-red-600">
                  {inputError.name}
                </Text>
              )}
            </View>

            <View className="mt-2">
              <Text className="font-nunito-semibold">Last Name:</Text>
              <Input className="mt-1">
                <InputField
                  className="font-nunito-regular"
                  placeholder="Enter your last name"
                  onChangeText={(text) => {
                    setValue((prev) => ({ ...prev, subName: text }));
                    setInputError((prev) => ({ ...prev, subName: "" }));
                  }}
                />
              </Input>
              {inputError.subName && (
                <Text className="font-nunito-regular mt-0.5 text-red-600">
                  {inputError.subName}
                </Text>
              )}
            </View>

            <View className="mt-2">
              <Text className="font-nunito-semibold">Color:</Text>
              <Input className="mt-1">
                <InputField
                  className="font-nunito-regular outline-cyan-100"
                  placeholder="Default: Blue"
                  onChangeText={(text) =>
                    setValue((prev) => ({ ...prev, color: text }))
                  }
                />
              </Input>
            </View>

            <Button
              className={`mt-3 ${loading && "bg-gray-300"}`}
              onPress={generateFbCover}
              isDisabled={loading}
            >
              <ButtonText
                className={`font-nunito-bold ${
                  loading ? "text-gray-700" : "text-white"
                }`}
              >
                {loading ? "Processing..." : "Create FB Cover"}
              </ButtonText>
            </Button>
          </Card>

          <Card className="mt-4 mb-16 elevation">
            <View className="gap-2">
              {link && typeof link === "string" ? (
                <>
                  <Pressable
                    className="h-52"
                    onPress={() =>
                      setPreview((prev) => ({ ...prev, show: true }))
                    }
                  >
                    <Image
                      size="full"
                      source={{
                        uri: link,
                      }}
                      resizeMode="contain"
                      alt="generated image"
                      onError={() => {
                        setLink(null);
                        setError({ code: "ERR_SERVER" });
                      }}
                    />
                  </Pressable>
                  <Button size="md" action="positive">
                    <ButtonText>Download</ButtonText>
                  </Button>
                </>
              ) : (
                <View className="w-full h-full items-center justify-center bg-gray-200 rounded">
                  <Text
                    className={`font-nunito-regular text-center ${
                      error ? "text-red-700" : "text-gray-500"
                    }`}
                  >
                    {error?.code === "ERR_NETWORK"
                      ? "Network error. Please check your internet connection."
                      : error?.code === "ERR_SERVER"
                      ? "Failed to create FB Cover, please use different image id or template and try again."
                      : error?.code
                      ? "There was an error creating your FB Cover."
                      : ""}

                    {!error && "Your FB Cover will be generated here."}
                  </Text>
                </View>
              )}
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}
