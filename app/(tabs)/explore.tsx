import { View, Text, ScrollView, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default function Explore() {
  const [data, setData] = useState<ProductType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f2f5" }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#4a6fa5",
          padding: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          alignItems: "center",
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Text style={{ fontSize: 28, color: "#FFD700" }}>🔥</Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              letterSpacing: 1,
              marginLeft: 10,
            }}
          >
            E-SHOP TEMAN KITA
          </Text>
          <Text style={{ fontSize: 28, color: "#FFD700", marginLeft: 10 }}>
            🔥
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "#ddd" }}>🛍️</Text>
          <Text style={{ fontSize: 14, color: "#ddd", marginLeft: 5 }}>
            Temukan barang keren disini!
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 15 }}
      >
        {/* Promo Banner */}
        <View
          style={{
            backgroundColor: "#ff6b6b",
            padding: 15,
            borderRadius: 15,
            marginBottom: 20,
            alignItems: "center",
            elevation: 3,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>🎯</Text>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
              }}
            >
              DISKON 50% BUAT PERTAMA KALI!
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#ffeaa7",
                marginTop: 5,
                textAlign: "center",
              }}
            >
              Buruan sebelum kehabisan!
            </Text>
          </View>
          <Text style={{ fontSize: 24, color: "#FFD700", marginLeft: 10 }}>
            ✨
          </Text>
        </View>

        {/* Products Grid */}
        <View style={{ marginBottom: 20 }}>
          {data.map((product) => (
            <Pressable
              key={product.id}
              onPress={() => {
                router.push({
                  pathname: '/detailProducts',
                  params: { product: JSON.stringify(product) },
                });
              }}
            >
              {/* Product Image */}
              <View
                style={{
                  position: "relative",
                  height: 200,
                  backgroundColor: "#f8f9fa",
                  padding: 10,
                }}
              >
                <Image
                  source={{ uri: product.image }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
                {/* Category Badge */}
                <View
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    backgroundColor: "#4a6fa5",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "white", fontSize: 10 }}>🏷️</Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "bold",
                      marginLeft: 5,
                    }}
                  >
                    {product.category.toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* Product Info */}
              <View style={{ padding: 15 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#2d3436",
                    marginBottom: 8,
                  }}
                  numberOfLines={2}
                >
                  {product.title}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: "#636e72",
                    marginBottom: 12,
                    lineHeight: 16,
                  }}
                  numberOfLines={2}
                >
                  {product.description}
                </Text>

                {/* Price & Rating */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 15,
                    paddingBottom: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: "#dfe6e9",
                  }}
                >
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: "#636e72" }}>💰</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          color: "#636e72",
                          marginLeft: 5,
                        }}
                      >
                        HARGA
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#e17055",
                      }}
                    >
                      Rp {Math.round(product.price * 15000).toLocaleString()}
                    </Text>
                  </View>

                  {product.rating && (
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={{ fontSize: 14, color: "#fdcb6e" }}>
                          ⭐
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: "#fdcb6e",
                            marginLeft: 5,
                          }}
                        >
                          {product.rating.rate}/5
                        </Text>
                      </View>
                      <Text
                        style={{ fontSize: 10, color: "#636e72", marginTop: 2 }}
                      >
                        ({product.rating.count} review)
                      </Text>
                    </View>
                  )}
                </View>

                {/* Action Buttons */}
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <TouchableOpacity
                    style={{
                      flex: 2,
                      backgroundColor: "#00b894",
                      paddingVertical: 12,
                      borderRadius: 10,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "white" }}>🛒</Text>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 14,
                        marginLeft: 8,
                      }}
                    >
                      BELI SEKARANG
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: "#74b9ff",
                      paddingVertical: 12,
                      borderRadius: 10,
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16, color: "white" }}>➕</Text>
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 12,
                        marginLeft: 5,
                      }}
                    >
                      Keranjang
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Footer Info */}
        <View
          style={{
            backgroundColor: "#2d3436",
            padding: 20,
            borderRadius: 15,
            marginTop: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>🚚</Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginLeft: 10,
              }}
            >
              Gratis ongkir min. beli 100rb
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>🔄</Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                marginLeft: 10,
              }}
            >
              Garansi 7 hari pengembalian
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: "white" }}>💬</Text>
            <Text style={{ color: "white", fontSize: 14, marginLeft: 10 }}>
              Chat seller langsung!
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}