import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function splash() {
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const timer = setTimeout(() => {
            // Start fade out animation
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                // Navigate after animation completes
                router.replace("/(tabs)/Home");
            });
        }, 4500); // Start fade out at 4.5s (total 5s with 0.5s animation)

        return () => clearTimeout(timer);
    }, []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#00aa5b",
                width: "100%",
                height: "100%",
                flex: 1,
            }}
        >
            <Animated.View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 15,
                    opacity: fadeAnim,
                }}
            >
                <Image
                    source={require("../assets/images/Tokopedia-splashscreen.jpeg")}
                    style={{ width: 150, height: 150 }}
                />
            </Animated.View>
        </SafeAreaView>
    );
}