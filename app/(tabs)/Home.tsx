import { useRouter } from 'expo-router'
import { ChevronRight, MapPin, Search } from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useCart } from '../../context/CartContext'

const { width } = Dimensions.get('window')

type ProductType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating?: {
        rate: number
        count: number
    }
}

export default function Home() {
    const { getCartCount } = useCart()
    const [data, setData] = useState<ProductType[]>([])
    const [loading, setLoading] = useState(true)
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0)
    const scrollViewRef = React.useRef<ScrollView>(null)
    const router = useRouter()

    const bannerImages = [
        { uri: 'https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/ce6066f61ef54fc2a3ce4d3b943daae5~tplv-zr7vqa5nfb-resize-jpeg:800:0.webp?ect=4g' },
        { uri: 'https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/f214e48f4448412b8021fe8bcbe057fb~tplv-zr7vqa5nfb-resize-jpeg:800:0.webp?ect=4g' },
        { uri: 'https://p16-images-comn-sg.tokopedia-static.net/tos-alisg-i-zr7vqa5nfb-sg/4f95ca31e3cf49089f8fe17e895fae3f~tplv-zr7vqa5nfb-resize-jpeg:800:0.webp?ect=4g' }
    ]

    // Navigation handler
    const handleProductPress = (product: ProductType) => {
        router.push({
            pathname: '/detailProducts',
            params: { product: JSON.stringify(product) }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products')
                const result = await res.json()
                setData(result)
            } catch (err) {
                console.log(err)
            } finally {
                // Add artificial delay to show loading indicator
                setTimeout(() => {
                    setLoading(false)
                }, 2000)
            }
        }

        fetchData()
    }, [])

    // Auto-scroll banner
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % bannerImages.length
                scrollViewRef.current?.scrollTo({
                    x: nextIndex * width,
                    animated: true
                })
                return nextIndex
            })
        }, 3000) // Change banner every 3 seconds

        return () => clearInterval(interval)
    }, [])

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x
        const index = Math.round(scrollPosition / width)
        setCurrentBannerIndex(index)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* ================= HEADER WITH BACKGROUND ================= */}
                <ImageBackground
                    source={require('../../assets/images/image 35.svg')}
                    style={{ width: '100%', paddingBottom: 20 }}
                    resizeMode="cover"
                >
                    <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
                        {/* Search Bar & Icons */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#ffffff',
                                    borderRadius: 8,
                                    paddingHorizontal: 12,
                                    height: 40,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 3
                                }}
                            >
                                <Search size={18} color="#64748b" />
                                <TextInput
                                    placeholder="Cari di Tokopedia"
                                    placeholderTextColor="#94a3b8"
                                    style={{ marginLeft: 8, flex: 1, fontSize: 14 }}
                                />
                            </View>

                            <TouchableOpacity style={{ marginLeft: 12 }}>
                                <Image source={require('../../assets/images/envelope.svg')} style={{ width: 24, height: 24 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 12 }}>
                                <View>
                                    <Image source={require('../../assets/images/bell.svg')} style={{ width: 24, height: 24 }} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => router.push('/cart')}>
                                <View>
                                    <Image source={require('../../assets/images/cart.svg')} style={{ width: 24, height: 24 }} />
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

                        {/* Location Bar */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MapPin size={14} color="#15ff00ff" />
                            <Text style={{ fontSize: 12, color: 'black', marginLeft: 4, flex: 1 }}>
                                Dikirim ke <Text style={{ fontWeight: 'bold' }}>Rumah Bimasena (Sindangbarang)</Text>
                            </Text>
                        </View>

                        {/* Info Cards Row */}

                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Image source={require('../../assets/images/Frame 60.svg')} style={{ width: 330, height: 35 }} resizeMode='contain' />
                    </View>
                </ImageBackground>
                {/* ================= PROMO BANNER CAROUSEL ================= */}
                <View style={{ backgroundColor: '#fff', position: 'relative' }}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        scrollEventThrottle={16}
                        style={{ width: '100%' }}
                    >
                        {bannerImages.map((image, index) => (
                            <View key={index} style={{ width: width }}>
                                <Image
                                    source={image}
                                    style={{ width: width, height: 150 }}
                                    resizeMode="stretch"
                                />
                            </View>
                        ))}
                    </ScrollView>

                    {/* Pagination Dots - Inside Banner */}
                    <View style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {bannerImages.map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    width: currentBannerIndex === index ? 24 : 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: currentBannerIndex === index ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                                    marginHorizontal: 4
                                }}
                            />
                        ))}
                    </View>
                </View>


                {/* ================= GRID MENU ================= */}
                <View style={{ backgroundColor: '#fff', paddingVertical: 20, marginTop: 8 }}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
                        {menuItem(require('../../assets/images/image 47.svg'), 'Fashion')}
                        {menuItem(require('../../assets/images/image 46.svg'), 'Toserba')}
                        {menuItem(require('../../assets/images/image 45.svg'), 'Tiket &\nHiburan ')}
                        {menuItem(require('../../assets/images/image 50.svg'), 'Promo \n Terdekat')}
                        {menuItem(require('../../assets/images/image 43.svg'), 'Tokopedia \n Seru')}
                        {menuItem(require('../../assets/images/image 42.svg'), 'Keuangan')}
                        {menuItem(require('../../assets/images/image 41.svg'), 'Tokopedia \n Card')}
                        {menuItem(require('../../assets/images/image 39.svg'), 'Beli Lokal')}
                    </ScrollView>
                </View>

                {/* ================= FLASH SALE SECTION ================= */}
                <View style={{ backgroundColor: '#fff', padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>⚡ Flash Sale</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#00AA5B', fontSize: 14, fontWeight: '600' }}>Lihat Semua</Text>
                            <ChevronRight size={16} color="#00AA5B" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {data.slice(0, 5).map((item) => (
                            <FlashSaleCard key={item.id} item={item} onPress={() => handleProductPress(item)} />
                        ))}
                    </ScrollView>
                </View>


                {/* ================= For Denis ================= */}
                <View style={{ backgroundColor: '#fff', paddingTop: 16 }}>
                    {/* Horizontal Tabs */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ paddingHorizontal: 16, marginBottom: 12 }}
                    >
                        <TouchableOpacity style={{
                            paddingBottom: 8,
                            marginRight: 24,
                            borderBottomWidth: 3,
                            borderBottomColor: '#00AA5B'
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#00AA5B'
                            }}>
                                For You !!
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            paddingBottom: 8,
                            marginRight: 24
                        }}>
                            <Image
                                source={require('../../assets/images/ramadhan-extra-seru.svg')}
                                style={{ width: 120, height: 30 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            paddingBottom: 8,
                            marginRight: 24
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#64748b'
                            }}>
                                Beli Lokal
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            paddingBottom: 8,
                            marginRight: 24
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#64748b'
                            }}>
                                Men's Clothing
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{
                            paddingBottom: 8,
                            marginRight: 24
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#64748b'
                            }}>
                                Teknologi
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                        {data.slice(5, 11).map((item) => (
                            <ProductCard key={item.id} item={item} onPress={() => handleProductPress(item)} />
                        ))}
                    </View>
                </View>

                {/* ================= PILIHAN PROMO HARI INI ================= */}
                <View style={{ backgroundColor: '#fff', padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>Pilihan Promo Hari Ini</Text>
                            <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>Diskon hingga 50%</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: '#00AA5B', fontSize: 14, fontWeight: '600' }}>Lihat Semua</Text>
                            <ChevronRight size={16} color="#00AA5B" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {data.slice(10, 15).map((item) => (
                            <PromoCard key={item.id} item={item} onPress={() => handleProductPress(item)} />
                        ))}
                    </ScrollView>
                </View>

                {/* ================= FOR YOU ================= */}
                <View style={{ backgroundColor: '#fff', padding: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>Rekomendasi Untukmu</Text>
                    </View>

                    {/* Grid Layout for Products */}
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {data.map((item) => (
                            <ProductCard key={item.id} item={item} onPress={() => handleProductPress(item)} />
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


/* ===================================================== */
/* ================= COMPONENTS ==================== */
/* ===================================================== */

const menuItem = (img: any, title: string) => (
    <TouchableOpacity style={{ alignItems: 'center', width: 70 }}>
        <View style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            backgroundColor: '#f8f9fa',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 6
        }}>
            <Image
                source={img}
                style={{ width: 56, height: 56, borderRadius: 10 }}
            />
        </View>
        <Text style={{ fontSize: 11, textAlign: 'center', color: '#1a1a1a', lineHeight: 14 }}>
            {title}
        </Text>
    </TouchableOpacity>
)

const FlashSaleCard = ({ item, onPress }: { item: ProductType; onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            width: 140,
            backgroundColor: '#fff',
            borderRadius: 8,
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#e2e8f0',
            overflow: 'hidden'
        }}
    >
        <View style={{ position: 'relative' }}>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: '100%',
                    height: 140,
                    resizeMode: 'contain',
                    backgroundColor: '#fafafa'
                }}
            />
            <View style={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: '#ff4757',
                paddingHorizontal: 6,
                paddingVertical: 3,
                borderRadius: 4
            }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>-{Math.floor(Math.random() * 50 + 20)}%</Text>
            </View>
        </View>

        <View style={{ padding: 8 }}>
            <Text numberOfLines={2} style={{ fontSize: 12, color: '#1a1a1a', height: 32 }}>
                {item.title}
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#1a1a1a', marginTop: 4 }}>
                Rp{(item.price * 16000).toLocaleString('id-ID')}
            </Text>

            <View style={{
                backgroundColor: '#fff5f5',
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 4,
                marginTop: 4,
                alignSelf: 'flex-start'
            }}>
                <Text style={{ fontSize: 10, color: '#ff4757', fontWeight: '600' }}>Segera Habis!</Text>
            </View>
        </View>
    </TouchableOpacity>
)

const CategoryCard = ({ item, onPress }: { item: ProductType; onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            width: 160,
            backgroundColor: '#fff',
            borderRadius: 8,
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#e2e8f0',
            overflow: 'hidden'
        }}
    >
        <Image
            source={{ uri: item.image }}
            style={{
                width: '100%',
                height: 160,
                resizeMode: 'contain',
                backgroundColor: '#fafafa'
            }}
        />

        <View style={{ padding: 10 }}>
            <Text numberOfLines={2} style={{ fontSize: 13, color: '#1a1a1a', height: 36 }}>
                {item.title}
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1a1a1a', marginTop: 6 }}>
                Rp{(item.price * 16000).toLocaleString('id-ID')}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ fontSize: 11, color: '#64748b' }}>⭐ {item.rating?.rate}</Text>
                <Text style={{ fontSize: 11, color: '#64748b', marginLeft: 8 }}>
                    {item.rating?.count}+ terjual
                </Text>
            </View>
        </View>
    </TouchableOpacity>
)

const PromoCard = ({ item, onPress }: { item: ProductType; onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
        style={{
            width: 150,
            backgroundColor: '#fff',
            borderRadius: 8,
            marginRight: 12,
            borderWidth: 1,
            borderColor: '#e2e8f0',
            overflow: 'hidden'
        }}
    >
        <View style={{ position: 'relative' }}>
            <Image
                source={{ uri: item.image }}
                style={{
                    width: '100%',
                    height: 150,
                    resizeMode: 'contain',
                    backgroundColor: '#fafafa'
                }}
            />
            <View style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: '#00AA5B',
                paddingHorizontal: 6,
                paddingVertical: 3,
                borderRadius: 4
            }}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>Promo</Text>
            </View>
        </View>

        <View style={{ padding: 8 }}>
            <Text numberOfLines={2} style={{ fontSize: 12, color: '#1a1a1a', height: 32 }}>
                {item.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{
                    fontSize: 10,
                    color: '#94a3b8',
                    textDecorationLine: 'line-through',
                    marginRight: 4
                }}>
                    Rp{((item.price * 16000) * 1.5).toLocaleString('id-ID')}
                </Text>
                <View style={{ backgroundColor: '#fee2e2', paddingHorizontal: 4, paddingVertical: 2, borderRadius: 3 }}>
                    <Text style={{ fontSize: 9, color: '#dc2626', fontWeight: 'bold' }}>33%</Text>
                </View>
            </View>

            <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#1a1a1a', marginTop: 2 }}>
                Rp{(item.price * 16000).toLocaleString('id-ID')}
            </Text>
        </View>
    </TouchableOpacity>
)

const ProductCard = ({ item, onPress }: { item: ProductType; onPress: () => void }) => (
    <TouchableOpacity
        onPress={onPress}
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
                height: 160,
                resizeMode: 'contain',
                backgroundColor: '#fafafa'
            }}
        />

        <View style={{ padding: 10 }}>
            <Text numberOfLines={2} style={{ fontSize: 13, color: '#1a1a1a', height: 36, lineHeight: 18 }}>
                {item.title}
            </Text>

            <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#1a1a1a', marginTop: 6 }}>
                Rp{(item.price * 16000).toLocaleString('id-ID')}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Text style={{ fontSize: 11, color: '#64748b' }}>⭐ {item.rating?.rate}</Text>
                <View style={{
                    width: 1,
                    height: 10,
                    backgroundColor: '#e2e8f0',
                    marginHorizontal: 6
                }} />
                <Text style={{ fontSize: 11, color: '#64748b' }}>
                    {item.rating?.count}+ terjual
                </Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <View style={{
                    backgroundColor: '#f0fdf4',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 3,
                    marginRight: 4
                }}>
                    <Text style={{ fontSize: 10, color: '#16a34a', fontWeight: '600' }}>Cashback</Text>
                </View>
                <Text style={{ fontSize: 10, color: '#64748b' }}>Jakarta Pusat</Text>
            </View>
        </View>
    </TouchableOpacity>
)
