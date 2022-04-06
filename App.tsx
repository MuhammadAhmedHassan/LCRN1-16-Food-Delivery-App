import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './stores/store';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types/types';
import CustomDrawer from './navigation/CustomDrawer';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['[react', 'Looks']);
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={CustomDrawer} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
