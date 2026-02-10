import { useLocalSearchParams, useRouter } from 'expo-router'
import { ArrowLeft, CheckCircle, Heart, ShoppingCart, Star } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Animated, Dimensions, Easing, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '../context/CartContext'

const { width, height } = Dimensions.get('window')

type Product = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export default function detailProducts() {
    const { addToCart, getCartCount, buyNow, addToWishlist, removeFromWishlist, isInWishlist } = useCart()
    const parameter = useLocalSearchParams()
    const router = useRouter()
    const product: Product = JSON.parse(parameter.product as string)
    const [recommendations, setRecommendations] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)


    const [showSuccess, setShowSuccess] = useState(false)
    const [showWishlistSuccess, setShowWishlistSuccess] = useState(false)

    // Animation State
    const [animating, setAnimating] = useState(false)
    const [animationValue] = useState(new Animated.ValueXY({ x: 0, y: 0 }))
    const [opacityValue] = useState(new Animated.Value(0))
    const [scaleValue] = useState(new Animated.Value(0))

    const startAddToCartAnimation = () => {
        if (animating) return

        setAnimating(true)
        animationValue.setValue({ x: 0, y: 0 })
        opacityValue.setValue(1)
        scaleValue.setValue(1)

        // Initial position (center screen) to Target position (top right cart icon)
        // Target is roughly top: 50, right: 20. Center is roughly width/2, height/2
        // We will animate from center to top-right

        Animated.parallel([
            Animated.timing(animationValue, {
                toValue: { x: width / 2 - 40, y: -(height / 2) + 60 }, // Move towards top right
                duration: 2000,
                useNativeDriver: true,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1)
            }),
            Animated.timing(scaleValue, {
                toValue: 0.1, // Shrink
                duration: 2000,
                useNativeDriver: true
            }),
            Animated.timing(opacityValue, {
                toValue: 0, // Fade out
                duration: 1670,
                delay: 200, // Start fading a bit later
                useNativeDriver: true
            })
        ]).start(() => {
            setAnimating(false)
        })
    }

    const handleAddToCart = () => {
        addToCart(product)
        startAddToCartAnimation()
    }

    const handleBuyNow = () => {
        buyNow(product)
        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
        }, 2000)
    }

    const handleWishlist = () => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id)
        } else {
            addToWishlist(product)
            setShowWishlistSuccess(true)
            setTimeout(() => {
                setShowWishlistSuccess(false)
            }, 2000)
        }
    }

    useEffect(() => {
        // Fetch recommendations from API
        const fetchRecommendations = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products')
                const result = await res.json()
                // Filter products from same category or random products
                const filtered = result.filter((item: Product) =>
                    item.id !== product.id &&
                    (item.category === product.category || Math.random() > 0.5)
                ).slice(0, 6)
                setRecommendations(filtered)
            } catch (err) {
                console.log(err)
            } finally {
                // Add artificial delay to show loading indicator
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            }
        }

        fetchRecommendations()
    }, [product.id])

    const handleRecommendationPress = (item: Product) => {
        router.push({
            pathname: '/detailProducts',
            params: { product: JSON.stringify(item) }
        })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    backgroundColor: '#fff',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e2e8f0'
                }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 16 }}>
                        <ArrowLeft size={24} color="#1a1a1a" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', flex: 1 }}>
                        Detail Produk
                    </Text>
                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={handleWishlist}>
                        <Heart
                            size={24}
                            color={isInWishlist(product.id) ? "#ef4444" : "#1a1a1a"}
                            fill={isInWishlist(product.id) ? "#ef4444" : "none"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => router.push('/cart')}>
                        <View>
                            <ShoppingCart size={24} color="#1a1a1a" />
                            {getCartCount() > 0 && (
                                <View style={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                    backgroundColor: '#ff4757',
                                    borderRadius: 10,
                                    width: 18,
                                    height: 18,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 1
                                }}>
                                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                                        {getCartCount() > 99 ? '99+' : getCartCount()}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Product Image */}
                <View style={{ backgroundColor: '#fff', padding: 20, alignItems: 'center' }}>
                    <Image
                        source={{ uri: product.image }}
                        style={{ width: width - 40, height: 300 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Product Info */}
                <View style={{ backgroundColor: '#fff', padding: 16, marginTop: 8 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1a1a1a', lineHeight: 28 }}>
                        {product.title}
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
                            <Star size={16} color="#fbbf24" fill="#fbbf24" />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1a1a1a', marginLeft: 4 }}>
                                {product.rating.rate}
                            </Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#64748b' }}>
                            {product.rating.count}+ terjual
                        </Text>
                    </View>

                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#00AA5B',
                        marginTop: 16
                    }}>
                        Rp{(product.price * 16000).toLocaleString('id-ID')}
                    </Text>

                    <View style={{
                        backgroundColor: '#f0fdf4',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 6,
                        alignSelf: 'flex-start',
                        marginTop: 12
                    }}>
                        <Text style={{ fontSize: 12, color: '#16a34a', fontWeight: '600' }}>
                            Cashback 10% • Gratis Ongkir
                        </Text>
                    </View>
                </View>

                {/* Product Description */}
                <View style={{ backgroundColor: '#fff', padding: 16, marginTop: 8 }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 8 }}>
                        Deskripsi Produk
                    </Text>
                    <Text style={{ fontSize: 14, color: '#64748b', lineHeight: 22 }}>
                        {product.description}
                    </Text>

                    <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#e2e8f0' }}>
                        <Text style={{ fontSize: 14, color: '#64748b', marginBottom: 4 }}>
                            <Text style={{ fontWeight: '600', color: '#1a1a1a' }}>Kategori:</Text> {product.category}
                        </Text>
                    </View>
                </View>

                {/* Recommendations */}
                <View style={{ backgroundColor: '#fff', padding: 16, marginTop: 8, marginBottom: 80 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12 }}>
                        Rekomendasi Untukmu
                    </Text>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {loading ? (
                            <View style={{ width: '100%', height: 100, alignItems: 'center', justifyContent: 'center' }}>
                                <ActivityIndicator size="large" color="#00AA5B" />
                            </View>
                        ) : (
                            recommendations.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    onPress={() => handleRecommendationPress(item)}
                                    style={{
                                        width: (width - 48) / 2,
                                        backgroundColor: '#fff',
                                        borderRadius: 8,
                                        marginBottom: 12,
                                        borderWidth: 1,
                                        borderColor: '#e2e8f0',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{
                                            width: '100%',
                                            height: 140,
                                            resizeMode: 'contain',
                                            backgroundColor: '#fafafa'
                                        }}
                                    />

                                    <View style={{ padding: 10 }}>
                                        <Text numberOfLines={2} style={{ fontSize: 12, color: '#1a1a1a', height: 32, lineHeight: 16 }}>
                                            {item.title}
                                        </Text>

                                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#1a1a1a', marginTop: 6 }}>
                                            Rp{(item.price * 16000).toLocaleString('id-ID')}
                                        </Text>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                                            <Star size={10} color="#fbbf24" fill="#fbbf24" />
                                            <Text style={{ fontSize: 10, color: '#64748b', marginLeft: 4 }}>
                                                {item.rating.rate} • {item.rating.count}+ terjual
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                </View>
            </ScrollView>

            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                padding: 16,
                borderTopWidth: 1,
                borderTopColor: '#e2e8f0',
                flexDirection: 'row',
                gap: 12
            }}>
                <TouchableOpacity
                    onPress={handleAddToCart}
                    style={{
                        flex: 1,
                        backgroundColor: '#fff',
                        borderWidth: 2,
                        borderColor: '#00AA5B',
                        borderRadius: 8,
                        paddingVertical: 14,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#00AA5B' }}>
                        + Keranjang
                    </Text>
                </TouchableOpacity>



                <TouchableOpacity
                    onPress={handleBuyNow}
                    style={{
                        flex: 1,
                        backgroundColor: '#00AA5B',
                        borderRadius: 8,
                        paddingVertical: 14,
                        alignItems: 'center'
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                        Beli Sekarang
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showSuccess}
                onRequestClose={() => setShowSuccess(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 5 }}>
                        <CheckCircle size={48} color="#00AA5B" style={{ marginBottom: 16 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center' }}>
                            Transaksi berhasil Dilakukan !!
                        </Text>
                    </View>
                </View>
            </Modal>

            {/* Wishlist Success Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showWishlistSuccess}
                onRequestClose={() => setShowWishlistSuccess(false)}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 16, alignItems: 'center', elevation: 5 }}>
                        <Heart size={48} color="#ef4444" fill="#ef4444" style={{ marginBottom: 16 }} />
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', textAlign: 'center' }}>
                            Barang di masukan ke wishlist !!
                        </Text>
                    </View>
                </View>
            </Modal>
            {/* Flying Animation Card */}
            {animating && (
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: height / 2 - 50, // Start from center
                        left: width / 2 - 100, // Center horizontally (card width 200 / 2)
                        zIndex: 1000,
                        transform: [
                            { translateX: animationValue.x },
                            { translateY: animationValue.y },
                            { scale: scaleValue }
                        ],
                        opacity: opacityValue
                    }}
                >
                    <View style={{
                        backgroundColor: '#00AA5B',
                        padding: 12,
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: 200,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5
                    }}>
                        <Image
                            source={{ uri: product.image }}
                            style={{ width: 40, height: 40, borderRadius: 4, backgroundColor: '#fff' }}
                        />
                        <Text style={{ color: '#fff', marginLeft: 10, fontSize: 12, fontWeight: 'bold', flex: 1 }}>
                            Barang dimasukkan ke keranjang
                        </Text>
                    </View>
                </Animated.View>
            )}

        </SafeAreaView>
    )
}