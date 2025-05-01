import Header from "@/components/header";
import { Text, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1">
      <Header />
      <View className="flex-1 p-2">
        <Button>
          <Link href="/img2link">goto img2link</Link>
        </Button>
      </View>
    </View>
  );
}
