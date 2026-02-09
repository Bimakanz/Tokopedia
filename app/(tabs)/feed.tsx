import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFocusEffect } from '@react-navigation/native'
import { ResizeMode, Video } from 'expo-av'
import { useRouter } from 'expo-router'
import { Heart, MessageCircle, Play, Plus, Share2, X } from 'lucide-react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions, Image, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

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

export default function Feed() {
    const router = useRouter()
    const video = useRef<Video>(null)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(15900)
    const [showProduct, setShowProduct] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const tabBarHeight = useBottomTabBarHeight()

    // Fetch Mens Cotton Jacket data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products')
                const data = await res.json()
                const jacket = data.find((item: Product) =>
                    item.title.toLowerCase().includes('mens cotton jacket')
                )
                setProduct(jacket || data[2]) // Fallback to product id 3 if not found

            } catch (error) {
                console.error('Error fetching product:', error)
            } finally {
                // Add artificial delay to show loading indicator
                setTimeout(() => {
                    setLoading(false)
                }, 1500)
            }
        }
        fetchProduct()
    }, [])

    // Pause/play video when tab is focused/unfocused
    useFocusEffect(
        useCallback(() => {
            // Reset product card visibility and play video when tab is focused
            setShowProduct(true)
            setIsPaused(false)

            // Small delay to ensure video is ready
            const timer = setTimeout(() => {
                video.current?.playAsync()
            }, 100)

            return () => {
                clearTimeout(timer)
                // Pause and reset video when tab is unfocused
                video.current?.pauseAsync()
                video.current?.setPositionAsync(0) // Reset to beginning
            }
        }, [])
    )

    const handleLike = () => {
        if (!isLiked) {
            setLikeCount(prev => prev + 1)
        } else {
            setLikeCount(prev => prev - 1)
        }
        setIsLiked(!isLiked)
    }

    const handlePlayPause = async () => {
        if (isPaused) {
            await video.current?.playAsync()
        } else {
            await video.current?.pauseAsync()
        }
        setIsPaused(!isPaused)
    }

    const formatCount = (count: number) => {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + ' rb'
        }
        return count.toString()
    }

    const formatPrice = (price: number) => {
        return 'Rp' + (price * 16000).toLocaleString('id-ID')
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <StatusBar barStyle="light-content" />

            {/* Tappable Video Area */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={handlePlayPause}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}
            >
                <Video
                    ref={video}
                    style={{ width, height }}
                    source={require('../../assets/images/Feed1.mp4')}
                    useNativeControls={false}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping={true}
                    shouldPlay={false}
                />

                {/* Play Icon Overlay when paused */}
                {isPaused && (
                    <View style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: [{ translateX: -30 }, { translateY: -30 }],
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        borderRadius: 40,
                        width: 60,
                        height: 60,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Play size={32} color="#fff" fill="#fff" />
                    </View>
                )}
            </TouchableOpacity>

            {/* Overlay UI */}
            <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }} pointerEvents="box-none">

                {/* Right Sidebar */}
                <View style={{ position: 'absolute', right: 16, bottom: tabBarHeight - 20, alignItems: 'center', zIndex: 10 }}>
                    {/* Profile */}
                    <View style={{ marginBottom: 20, alignItems: 'center' }}>
                        <View style={{ marginBottom: 10, position: 'relative' }}>
                            <Image
                                source={require('../../assets/images/tokped.jpg')}
                                style={{ width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: '#fff' }}
                            />
                            <View style={{ position: 'absolute', bottom: -6, left: 14, backgroundColor: '#00AA5B', width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Plus size={12} color="#fff" strokeWidth={3} />
                            </View>
                        </View>
                    </View>

                    {/* Like */}
                    <TouchableOpacity style={{ marginBottom: 20, alignItems: 'center' }} onPress={handleLike}>
                        <Heart
                            size={32}
                            color={isLiked ? '#ff4757' : '#fff'}
                            fill={isLiked ? '#ff4757' : 'transparent'}
                        />
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600', marginTop: 4, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}>
                            {formatCount(likeCount)}
                        </Text>
                    </TouchableOpacity>

                    {/* Comment */}
                    <TouchableOpacity style={{ marginBottom: 20, alignItems: 'center' }}>
                        <MessageCircle size={32} color="#fff" fill="#fff" />
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600', marginTop: 4, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}>
                            1,1 rb
                        </Text>
                    </TouchableOpacity>

                    {/* Share */}
                    <TouchableOpacity style={{ marginBottom: 20, alignItems: 'center' }}>
                        <Share2 size={32} color="#fff" fill="#fff" />
                        <Text style={{ color: '#fff', fontSize: 13, fontWeight: '600', marginTop: 4, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}>
                            435
                        </Text>
                    </TouchableOpacity>


                </View>

                {/* Bottom Info */}
                <View style={{ position: 'absolute', left: 16, right: 16, bottom: tabBarHeight - 50, zIndex: 5 }}>
                    {/* Product Card Overlay */}
                    {showProduct && product && !loading && (
                        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 8, flexDirection: 'row', marginBottom: 16, width: 280, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                            <View style={{ position: 'relative' }}>
                                <Image
                                    source={{ uri: product.image }}
                                    style={{ width: 70, height: 70, borderRadius: 6, backgroundColor: '#f1f1f1' }}
                                />
                                <View style={{ position: 'absolute', top: 0, left: 0, backgroundColor: '#ff4757', paddingHorizontal: 4, paddingVertical: 2, borderTopLeftRadius: 6, borderBottomRightRadius: 6 }}>
                                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>30%</Text>
                                </View>
                            </View>

                            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ marginRight: 4 }}>
                                        <Image source={require('../../assets/images/official-store.svg')} style={{ width: 12, height: 12, tintColor: '#00AA5B' }} />
                                    </View>
                                    <Text numberOfLines={1} style={{ fontSize: 13, fontWeight: '600', color: '#1f2937', flex: 1, marginRight: 4 }}>
                                        {product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title}
                                    </Text>
                                    <TouchableOpacity onPress={() => setShowProduct(false)}>
                                        <X size={16} color="#9ca3af" />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                    <Text style={{ fontSize: 10, color: '#ff4757', backgroundColor: '#fee2e2', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 2, fontWeight: '600' }}>
                                        Flash Sale
                                    </Text>
                                    <Text style={{ fontSize: 10, color: '#ff4757', marginLeft: 4 }}>04:21:18</Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                                    <Text style={{ fontSize: 10, color: '#6b7280' }}>
                                        ★ {product.rating.rate} • Terjual {formatCount(product.rating.count)}+
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 4 }}>
                                    <View>
                                        <Text style={{ fontSize: 10, color: '#9ca3af', textDecorationLine: 'line-through' }}>
                                            {formatPrice(product.price)}
                                        </Text>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#1f2937' }}>
                                            {formatPrice(product.price * 0.7)}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => router.push({
                                            pathname: '/detailProducts',
                                            params: { product: JSON.stringify(product) }
                                        })}
                                        style={{ backgroundColor: '#00AA5B', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 4 }}
                                    >
                                        <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>Beli</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                    {loading && (
                        <View style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, marginBottom: 16, width: 280, alignItems: 'center' }}>
                            <ActivityIndicator size="small" color="#00AA5B" />
                        </View>
                    )}

                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 8, textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }}>
                        Ismeth Alatas
                    </Text>
                    <Text style={{ color: '#fff', fontSize: 14, lineHeight: 20, width: '80%', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 3 }} numberOfLines={2}>
                        The best jacket in The World !! <Text style={{ fontWeight: 'bold' }}>Selengkapnya</Text>
                    </Text>
                </View>

            </SafeAreaView>
        </View>
    )
}

