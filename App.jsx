import React, { useEffect } from 'react';
import { View, Image, Animated } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LogScreen from './src/screens/LogScreen';
import TopicScreen from './src/screens/TopicScreen';
import SelectedTopicScreen from './src/screens/SelectedTopicScreen';
import ReadFirstScreen from './src/screens/ReadFirstScreen';
import ReadSecondScreen from './src/screens/ReadSecondScreen';

enableScreens();

const Stack = createStackNavigator();

const LoadingScreen = ({ navigation }) => {
      const progress = new Animated.Value(0);
  
      useEffect(() => {
          Animated.timing(progress, {
              toValue: 100,
              duration: 5000,
              useNativeDriver: false,
          }).start(() => {
              navigation.replace('LogScreen');
          });
      }, []);
  
      return (
          <LinearGradient colors={["#2925dd", "#fc4afc"]} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('./src/assets/sphinx.png')} style={{ width: 344, height: 344, resizeMode: 'contain'}} />
              
              <View style={{ width: '85%', height: 4, backgroundColor: '#570f82', borderRadius: 10, overflow: 'hidden', position: 'absolute', bottom: 100, alignSelf: 'center' }}>
                  <Animated.View style={{
                      width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
                      height: '100%',
                      backgroundColor: '#fee63e',
                  }} />
              </View>
          </LinearGradient>
      );
  };

const App = () => {

  return (
          <NavigationContainer>
              <Stack.Navigator initialRouteName={"LoadingScreen" }>
                  <Stack.Screen 
                        name="LoadingScreen" 
                        component={LoadingScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="LogScreen" 
                        component={LogScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="TopicScreen" 
                        component={TopicScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="SelectedTopicScreen" 
                        component={SelectedTopicScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ReadFirstScreen" 
                        component={ReadFirstScreen} 
                        options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                        name="ReadSecondScreen" 
                        component={ReadSecondScreen} 
                        options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
          </NavigationContainer>
    );
};

export default App;
