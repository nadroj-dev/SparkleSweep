import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUser, useClerk } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigation = useNavigation();

  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icon: 'home',
    },
    {
      id: 2,
      name: 'My Booking',
      icon: 'bookmark-sharp',
    },
    {
      id: 3,
      name: 'Logout',
      icon: 'log-out',
    },
  ];

  const handleLogout = async () => {
    try {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Logout',
            onPress: async () => {
              await signOut();
              navigation.replace('Login');
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.error('Logout error', err);
    }
  };

  return (
    <View>
      <View
        style={{
          padding: 20,
          paddingTop: 30,
          backgroundColor: Colors.PRIMARY,
        }}>
        <Text style={{ fontSize: 30, fontFamily: 'outfit-bold' }}>Profile</Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <Image
            source={{ uri: user.imageUrl }}
            style={{ width: 90, height: 90, borderRadius: 99 }}
          />
          <Text
            style={{ fontSize: 26, marginTop: 8, fontFamily: 'outfit-medium' }}>
            {user.fullName}
          </Text>
          <Text
            style={{ fontSize: 18, marginTop: 8, fontFamily: 'outfit-medium' }}>
            {user?.primaryEmailAddress.emailAddress}
          </Text>
        </View>
      </View>

      <View style={{ paddingTop: 50 }}>
        <FlatList
          data={profileMenu}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={item.name === 'Logout' ? handleLogout : null}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 30,
                paddingHorizontal: 140,
              }}>
              <Ionicons name={item.icon} size={35} color={Colors.PRIMARY} />
              <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
