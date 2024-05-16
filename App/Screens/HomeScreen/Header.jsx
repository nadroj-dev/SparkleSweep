import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../Utils/Colors'
import { FontAwesome } from '@expo/vector-icons';

export default function Header() {
    const {user, isLoading} = useUser();
  return user&&(
    <View style={styles.container}>
    {/* Profile Section */}
    <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
            <Image source={{uri:user?.imageUrl}}
            style={styles.userImage}/>
            <View>
                <Text style={{color:Colors.WHITE, fontFamily:'outfit'}}>Welcome,</Text>
                <Text style={{color:Colors.WHITE,
                fontSize:20, fontFamily:'outfit-medium'}}>{user?.fullName}</Text>
            </View>
        </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:20,
        paddingTop:50,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
    profileMainContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap:10
    },
    userImage:{
        width:45,
        height:45,
        borderRadius:99
    }
})