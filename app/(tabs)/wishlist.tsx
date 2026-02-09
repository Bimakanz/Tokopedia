import { useRouter } from 'expo-router'
import { Heart, Trash2 } from 'lucide-react-native'
import React, { useState } from 'react'
import { Alert, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '../../context/CartContext'

const { width } = Dimensions.get('window')

export default function Wishlist() {
    const router = useRouter()
    const { wishlist, removeFromWishlist, addToCart } = useCart()
    const [activeFilter, setActiveFilter] = useState('Semua')

    const categories = ['Semua', "men's clothing", "jewelery", "electronics", "women's clothing"]

    const formatPrice = (price: number) => {
        return 'Rp' + (price * 16000).toLocaleString('id-ID')
    }

    const filteredWishlist = wishlist.filter(item => {
        if (activeFilter === 'Semua') return true
        return item.category === activeFilter
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <View style={{ backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>Wishlist</Text>
            </View>

            {/* Filter Category */}
            <View style={{ backgroundColor: '#fff', paddingVertical: 12 }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                    {categories.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => setActiveFilter(category)}
                            style={{
                                marginRight: 8,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 20,
                                backgroundColor: activeFilter === category ? '#00AA5B' : '#f1f5f9',
                                borderWidth: 1,
                                borderColor: activeFilter === category ? '#00AA5B' : '#e2e8f0'
                            }}
                        >
                            <Text style={{
                                color: activeFilter === category ? '#fff' : '#64748b',
                                fontWeight: activeFilter === category ? '600' : '400',
                                textTransform: 'capitalize'
                            }}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16 }}>
                {filteredWishlist.length === 0 ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                        <Heart size={80} color="#cbd5e1" />
                        <Text style={{ marginTop: 16, fontSize: 16, color: '#64748b', fontWeight: 'bold' }}>
                            Wishlist kamu masih kosong
                        </Text>
                        <Text style={{ marginTop: 8, fontSize: 14, color: '#94a3b8', textAlign: 'center' }}>
                            Simpan barang favoritmu di sini biar nggak hilang!
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/Home')}
                            style={{
                                marginTop: 24,
                                backgroundColor: '#00AA5B',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 8
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cari Barang</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {filteredWishlist.map((item) => (
                            <View key={item.id} style={{
                                width: (width - 48) / 2,
                                backgroundColor: '#fff',
                                borderRadius: 8,
                                marginBottom: 16,
                                overflow: 'hidden',
                                elevation: 2,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.1,
                                shadowRadius: 2
                            }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ width: '100%', height: 150, resizeMode: 'cover' }}
                                />
                                <View style={{ padding: 12 }}>
                                    <Text numberOfLines={2} style={{ fontSize: 14, color: '#1f2937', marginBottom: 4, minHeight: 40 }}>
                                        {item.title}
                                    </Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 }}>
                                        {formatPrice(item.price)}
                                    </Text>

                                    <View style={{ flexDirection: 'row', gap: 8 }}>
                                        <TouchableOpacity
                                            onPress={() => removeFromWishlist(item.id)}
                                            style={{
                                                padding: 8,
                                                borderWidth: 1,
                                                borderColor: '#ef4444',
                                                borderRadius: 4,
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <Trash2 size={20} color="#ef4444" />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                addToCart(item)
                                                removeFromWishlist(item.id) // Optional: remove from wishlist after adding to cart?
                                                // User logic: "beli dan membuang". Assuming "Beli" means add to cart.
                                                // Let's keep it in wishlist or remove? 
                                                // User said "fitur untuk beli dan membuang".
                                                // Let's Assume the main button is " + Keranjang"
                                                Alert.alert('Sukses', 'Barang dipindahkan ke keranjang')
                                            }}
                                            style={{
                                                flex: 1,
                                                backgroundColor: '#00AA5B',
                                                borderRadius: 4,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                paddingVertical: 8
                                            }}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>+ Keranjang</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
