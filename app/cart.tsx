import { useRouter } from 'expo-router'
import { ArrowLeft, CheckCircle, Minus, Plus, Trash2 } from 'lucide-react-native'
import React, { useState } from 'react'
import { Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useCart } from '../context/CartContext'

const { width } = Dimensions.get('window')

export default function Cart() {
    const router = useRouter()
    const { cart, removeFromCart, addToCart, deleteFromCart, getTotalPrice, toggleCheck, checkout } = useCart()

    const [showSuccess, setShowSuccess] = useState(false)

    const formatPrice = (price: number) => {
        return 'Rp' + (price * 16000).toLocaleString('id-ID')
    }

    const handleCheckout = () => {
        checkout()
        setShowSuccess(true)
        setTimeout(() => {
            setShowSuccess(false)
            router.push('/transaksi')
        }, 2000)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
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
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' }}>
                    Keranjang
                </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {cart.length === 0 ? (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 100 }}>
                        <Image
                            source={require('../assets/images/cart.svg')}
                            style={{ width: 100, height: 100, opacity: 0.5, tintColor: '#94a3b8' }}
                        />
                        <Text style={{ marginTop: 20, fontSize: 16, color: '#64748b', fontWeight: 'bold' }}>
                            Keranjangmu masih kosong
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push('/Home')}
                            style={{
                                marginTop: 16,
                                backgroundColor: '#00AA5B',
                                paddingHorizontal: 20,
                                paddingVertical: 10,
                                borderRadius: 8
                            }}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Belanja Sekarang</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    cart.map((item) => (
                        <View key={item.id} style={{
                            backgroundColor: '#fff',
                            marginTop: 8,
                            padding: 16,
                            flexDirection: 'row',
                            alignItems: 'flex-start'
                        }}>
                            {/* Checkbox (Mock) */}
                            <TouchableOpacity
                                onPress={() => toggleCheck(item.id)}
                                style={{
                                    width: 20,
                                    height: 20,
                                    borderWidth: 2,
                                    borderColor: item.checked ? '#00AA5B' : '#cbd5e1',
                                    borderRadius: 4,
                                    marginRight: 12,
                                    marginTop: 25,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: item.checked ? '#00AA5B' : 'transparent'
                                }}
                            >
                                {item.checked && <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>✓</Text>}
                            </TouchableOpacity>

                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 70, height: 70, borderRadius: 6, backgroundColor: '#f1f1f1' }}
                            />

                            <View style={{ flex: 1, marginLeft: 12 }}>
                                <Text numberOfLines={2} style={{ fontSize: 14, color: '#1f2937', marginBottom: 4 }}>
                                    {item.title}
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1f2937', marginBottom: 12 }}>
                                    {formatPrice(item.price)}
                                </Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', gap: 16 }}>
                                    <TouchableOpacity onPress={() => deleteFromCart(item.id)}>
                                        <Trash2 size={20} color="#94a3b8" />
                                    </TouchableOpacity>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6 }}>
                                        <TouchableOpacity
                                            onPress={() => removeFromCart(item.id)}
                                            style={{ padding: 6 }}
                                        >
                                            <Minus size={16} color={item.quantity > 1 ? "#64748b" : "#cbd5e1"} />
                                        </TouchableOpacity>
                                        <Text style={{ marginHorizontal: 12, fontWeight: 'bold', minWidth: 20, textAlign: 'center' }}>
                                            {item.quantity}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => addToCart(item)}
                                            style={{ padding: 6 }}
                                        >
                                            <Plus size={16} color="#00AA5B" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* Bottom Footer */}
            {cart.length > 0 && (
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
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <View>
                        <Text style={{ fontSize: 12, color: '#64748b', marginBottom: 2 }}>Total Harga</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#1f2937' }}>
                            {formatPrice(getTotalPrice())}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleCheckout}
                        style={{
                            backgroundColor: '#00AA5B',
                            paddingHorizontal: 32,
                            paddingVertical: 12,
                            borderRadius: 8
                        }}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Beli ({cart.filter(i => i.checked).reduce((acc, item) => acc + item.quantity, 0)})</Text>
                    </TouchableOpacity>
                </View>
            )}
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
        </SafeAreaView>
    )
}
