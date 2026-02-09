import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function OfficialStore() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <ScrollView>
                <View style={{ padding: 20, alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' }}>Official Store</Text>
                    <Text style={{ fontSize: 14, color: '#64748b', marginTop: 8 }}>Halaman Official Store akan segera hadir</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
