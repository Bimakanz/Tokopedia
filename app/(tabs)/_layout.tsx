import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { useCart } from '../../context/CartContext'

export default function TabLayout() {
  const { getWishlistCount } = useCart()
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00AA5B',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 80,
          paddingBottom: 8,
          paddingTop: 8
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500'
        }
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Buat Kamu',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/buat-kamu.svg')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#00AA5B' : '#94a3b8'
              }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/feed.svg')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#00AA5B' : '#94a3b8'
              }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="official-store"
        options={{
          title: 'Official Store',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/official-store.svg')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#00AA5B' : '#94a3b8'
              }}
            />
          )
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require('../../assets/images/wishlist.svg')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#00AA5B' : '#94a3b8'
                }}
              />
              {getWishlistCount() > 0 && (
                <View style={{
                  position: 'absolute',
                  top: -4,
                  right: -4,
                  backgroundColor: '#ef4444',
                  borderRadius: 10,
                  width: 16,
                  height: 16,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                    {getWishlistCount()}
                  </Text>
                </View>
              )}
            </View>
          )
        }}
      />
      <Tabs.Screen
        name="transaksi"
        options={{
          title: 'Transaksi',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/images/receipt.svg')}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#00AA5B' : '#94a3b8'
              }}
            />
          )
        }}
      />
      {/* Hide old tabs */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null
        }}
      />
    </Tabs>
  )
}
