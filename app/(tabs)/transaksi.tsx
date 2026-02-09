import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '../../context/CartContext'

const { width } = Dimensions.get('window')

export default function Transaksi() {
    const router = useRouter()
    const { transactions } = useCart()
    const [activeFilter, setActiveFilter] = useState('Semua')

    const categories = ['Semua', "men's clothing", "jewelery", "electronics", "women's clothing"]

    const formatPrice = (price: number) => {
        return 'Rp' + (price * 16000).toLocaleString('id-ID')
    }

    const filteredTransactions = transactions.filter(transaction => {
        if (activeFilter === 'Semua') return true
        // Check if any item in the transaction matches the active filter
        return transaction.items.some(item => item.category === activeFilter)
    })

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <View style={{ backgroundColor: '#fff', padding: 16, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>Daftar Transaksi</Text>
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

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                {filteredTransactions.length === 0 ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                        <Image
                            source={require('../../assets/images/receipt.svg')}
                            style={{ width: 80, height: 80, opacity: 0.5, tintColor: '#94a3b8' }}
                        />
                        <Text style={{ marginTop: 16, color: '#64748b' }}>Belum ada transaksi</Text>
                    </View>
                ) : (
                    filteredTransactions.map((transaction) => (
                        <View key={transaction.id} style={{
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            padding: 16,
                            marginBottom: 16,
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 2,
                            elevation: 2
                        }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#f1f5f9', paddingBottom: 12 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={require('../../assets/images/official-store.svg')} style={{ width: 16, height: 16, marginRight: 8 }} />
                                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#1a1a1a' }}>Belanja</Text>
                                    <Text style={{ fontSize: 12, color: '#64748b', marginLeft: 8 }}>{new Date(transaction.date).toLocaleDateString('id-ID')}</Text>
                                </View>
                                <View style={{ backgroundColor: '#d1fae5', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 }}>
                                    <Text style={{ color: '#00AA5B', fontSize: 10, fontWeight: 'bold' }}>{transaction.status}</Text>
                                </View>
                            </View>

                            {transaction.items.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => router.push({
                                        pathname: '/detailProducts',
                                        params: { product: JSON.stringify(item) }
                                    })}
                                    style={{ flexDirection: 'row', marginBottom: 12 }}
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: 50, height: 50, borderRadius: 6, backgroundColor: '#f1f5f9' }}
                                    />
                                    <View style={{ flex: 1, marginLeft: 12 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' }}>{item.title}</Text>
                                        <Text style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{item.quantity} Barang</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f1f5f9' }}>
                                <View>
                                    <Text style={{ fontSize: 12, color: '#64748b' }}>Total Belanja</Text>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1a1a1a' }}>{formatPrice(transaction.totalPrice)}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (transaction.items.length > 0) {
                                            router.push({
                                                pathname: '/detailProducts',
                                                params: { product: JSON.stringify(transaction.items[0]) }
                                            })
                                        }
                                    }}
                                    style={{ backgroundColor: '#00AA5B', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 6 }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>Beli Lagi</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
