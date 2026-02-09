import { View, Text, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

type userType = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default function Index() {
  const [users, setUsers] = useState<userType[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((result) => setUsers(result.slice(0, 5)))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <ScrollView contentContainerStyle={{ padding: 15,  }}>
        {users.map((user) => (
          <View key={user.id} style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 30,
            paddingBottom:150,
            marginBottom: 15,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, 
            
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#2c3e50' }}>
              {user.name}
            </Text>
            <View style={{flexDirection:'row', gap:20}}>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#34495e', marginTop: 5, flexWrap:'wrap' }}>Email: {user.email}</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#34495e', marginTop: 5, flexWrap:'wrap' }}>Phone: {user.phone}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
} 