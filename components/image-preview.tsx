import { View, Text, Pressable } from "react-native";
import React, { memo } from "react";
import { Image } from "./ui/image";

const ImagePreview: React.FC<{
  uri: string | ArrayBuffer | null;
  show: boolean;
  close: () => void;
}> = ({ uri, show, close }) => {
  return (
    <>
      {show && typeof uri === "string" && (
        <Pressable
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          className={`w-full h-full mt-[51px] px-1 items-center absolute z-10`}
          onPress={close}
        >
          <Image
            size="full"
            source={{
              uri: uri,
            }}
            resizeMode="contain"
            alt="generated image"
          />
        </Pressable>
      )}
    </>
  );
};

export default memo(ImagePreview, (prevProps, nextProps) => {
  return (
    prevProps.uri === nextProps.uri &&
    prevProps.show === nextProps.show &&
    prevProps.close === nextProps.close
  );
});
