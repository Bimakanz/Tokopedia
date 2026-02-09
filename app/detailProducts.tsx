import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
};
export default function detailProducts() {

    const parameter = useLocalSearchParams();
    const product: Product = JSON.parse(parameter.product as string);
    return (
        <SafeAreaView style={{ padding: 20 }}>
            <View>
                <Text style={{ flexWrap: 'wrap' }}> {product.title}</Text>
                <Text style={{ flexWrap: 'wrap' }}> {product.description}</Text>
                <Text style={{ flexWrap: 'wrap' }}> $ {product.price}</Text>
                <Text style={{ flexWrap: 'wrap' }}>{product.category}</Text>
                <Image
                    source={{ uri: product.image }}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="contain"
                />  
            </View>
        </SafeAreaView>
    )
}