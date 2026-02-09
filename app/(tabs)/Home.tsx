import { View, Text, TextInput, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search } from 'lucide-react-native'

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
    const [data, setData] = useState<ProductType[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://fakestoreapi.com/products')
                const result = await res.json()
                setData(result)
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* ================= HEADER ================= */}
                <View style={{ backgroundColor: '#fff', padding: 15 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#f1f1f1',
                                borderRadius: 12,
                                paddingHorizontal: 10,
                                height: 40
                            }}
                        >
                            <Search size={16} color="gray" />
                            <TextInput
                                placeholder="Cari di Tokopedia"
                                style={{ marginLeft: 6, flex: 1 }}
                            />
                        </View>

                        <Image source={require('../../assets/images/envelope.svg')} style={{ width: 22, height: 22, marginLeft: 12 }} />
                        <Image source={require('../../assets/images/bell.svg')} style={{ width: 22, height: 22, marginLeft: 12 }} />
                        <Image source={require('../../assets/images/cart.svg')} style={{ width: 22, height: 22, marginLeft: 12 }} />
                    </View>
                </View>


                {/* ================= BANNER ================= */}
                <Image
                    source={require('../../assets/images/image 35.svg')}
                    style={{ width: '100%', height: 160 }}
                    resizeMode="cover"
                />


                {/* ================= GRID MENU ================= */}
                <View
                    style={{
                        backgroundColor: '#fff',
                        marginTop: 10,
                        paddingVertical: 20,
                        paddingHorizontal: 12,
                        borderRadius: 16
                    }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
                        {menuItem(require('../../assets/images/image 47.svg'), 'Ramadan')}
                        {menuItem(require('../../assets/images/image 46.svg'), 'Mumpung\nMurah')}
                        {menuItem(require('../../assets/images/image 45.svg'), 'Beli Lokal')}
                        {menuItem(require('../../assets/images/image 50.svg'), 'Card')}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 }}>
                        {menuItem(require('../../assets/images/image 43.svg'), 'Keuangan')}
                        {menuItem(require('../../assets/images/image 42.svg'), 'Seru')}
                        {menuItem(require('../../assets/images/image 41.svg'), 'Tiket &\nHiburan')}
                        {menuItem(require('../../assets/images/image 39.svg'), 'Sembako')}
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {menuItem(require('../../assets/images/image 38.svg'), 'Fashion')}
                        {menuItem(require('../../assets/images/image 37.svg'), 'THR Extra')}
                        {menuItem(require('../../assets/images/image 36.svg'), 'Olahraga')}
                        {menuItem(require('../../assets/images/image 34.svg'), 'Promo')}
                    </View>
                </View>


                {/* ================= BANNER DISKON ================= */}
                <Image
                    source={require('../../assets/images/image 37.svg')}
                    style={{ width: '100%', height: 120, marginTop: 12 }}
                    resizeMode="cover"
                />


                {/* ================= FOR YOU ================= */}
                <View style={{ padding: 15 }}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#16a34a',
                        marginBottom: 10
                    }}>
                        For You
                    </Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {data.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}


/* ===================================================== */
/* ================= COMPONENT KECIL ==================== */
/* ===================================================== */

const menuItem = (img: any, title: string) => (
    <View style={{ alignItems: 'center', width: 80 }}>
        <Image
            source={img}
            style={{ width: 50, height: 50, borderRadius: 12 }}
        />
        <Text style={{ fontSize: 12, textAlign: 'center', marginTop: 6 }}>
            {title}
        </Text>
    </View>
)

const ProductCard = ({ item }: { item: ProductType }) => (
    <View
        style={{
            width: 150,
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 10,
            marginRight: 12,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 3
        }}
    >
        <Image
            source={{ uri: item.image }}
            style={{
                width: '100%',
                height: 110,
                resizeMode: 'contain'
            }}
        />

        <Text numberOfLines={2} style={{ fontSize: 12, marginTop: 6 }}>
            {item.title}
        </Text>

        <Text style={{ fontWeight: 'bold', marginTop: 4 }}>
            Rp {(item.price * 16000).toLocaleString('id-ID')}
        </Text>

        <Text style={{ fontSize: 11, color: 'gray', marginTop: 2 }}>
            ⭐ {item.rating?.rate} | {item.rating?.count} terjual
        </Text>
    </View>
)
