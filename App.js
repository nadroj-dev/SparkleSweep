import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Login from './App/Screens/LoginScreen/Login';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigation} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    outfit: require('./assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/fonts/Outfit-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <ClerkProvider publishableKey="pk_test_Zm9uZC1maWxseS00Ny5jbGVyay5hY2NvdW50cy5kZXYk">
      <View style={styles.container}>
        {/* Sign In Component */}
        <SignedIn>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SignedIn>
        {/* SignOut */}
        <SignedOut>
          <Login />
        </SignedOut>
        <StatusBar style="auto" />
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
