import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OfficialStore() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView>
                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                    <Image
                        source={require('../../assets/images/tokped official store.png')}
                        style={{ width: 300, height: 300, marginBottom: 16 }}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#1a1a1a' }}>Official Store</Text>
                    <Text style={{ fontSize: 16, color: '#64748b', marginTop: 8 }}>Halaman Official Store akan segera hadir</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
