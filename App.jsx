import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { MusicProvider } from './src/constants/music';
import Music from './src/components/Music';

import LogScreen from './src/screens/LogScreen';
import TopicScreen from './src/screens/TopicScreen';
import SelectedTopicScreen from './src/screens/SelectedTopicScreen';
import ReadFirstScreen from './src/screens/ReadFirstScreen';
import ReadSecondScreen from './src/screens/ReadSecondScreen';
import PyramidsScreen from './src/screens/PyramidsScreen';
import ReadPyramidScreen from './src/screens/ReadPyramidScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import RiddleScreen from './src/screens/RiddleScreen';

enableScreens();

const Stack = createStackNavigator();

const loaders = [
      require('./src/assets/loaders/1.png'),
      require('./src/assets/loaders/2.png'),
    ];

const App = () => {
      const [currentLoader, setCurrentLoader] = useState(0);
      const slideAnimation1 = useRef(new Animated.Value(0)).current;
      const slideAnimation2 = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  
      useEffect(() => {
            const animationTimeout = setTimeout(() => {
            slideToNextLoader();
      }, 1500);
  
      const navigation = setTimeout(() => {
            navigateToMenu();
            }, 4000);
  
            return () => {
                  clearTimeout(animationTimeout);
                  clearTimeout(navigation);
            };
      }, []);
  
      const slideToNextLoader = () => {
            Animated.parallel([
            Animated.timing(slideAnimation1, {
                  toValue: -Dimensions.get('window').width,
                  duration: 1500,
                  useNativeDriver: true,
            }),
            Animated.timing(slideAnimation2, {
                  toValue: 0,
                  duration: 1500,
                  useNativeDriver: true,
                  }),
            ]).start(() => {
                  setCurrentLoader(1);
            });
      };
  
      const navigateToMenu = () => {
            setCurrentLoader(2);
      };  

  return (
    <MusicProvider>
            <Music />
            <NavigationContainer>
                  <Stack.Navigator
                        screenOptions={{
                        headerShown: false,
                        animation: 'fade',
                        animationDuration: 1000,
                  }}>
                        {currentLoader < 2 ? (
                              <Stack.Screen name="Welcome" options={{ headerShown: false }}>
                              {() => (
                              <View style={{ flex: 1, backgroundColor: '#000' }}>
                                    <Animated.Image
                                          source={loaders[0]}
                                          style={[
                                          { 
                                                width: '100%', 
                                                height: '100%', 
                                                position: 'absolute',
                                          },
                                          { 
                                                transform: [{ translateX: slideAnimation1 }],
                                          },
                                          ]}
                                    />
                                    <Animated.Image
                                          source={loaders[1]}
                                          style={[
                                          { 
                                                width: '100%', 
                                                height: '100%', 
                                                position: 'absolute',
                                          },
                                          { 
                                                transform: [{ translateX: slideAnimation2 }],
                                          },
                                          ]}
                                    />
                              </View>
                              )}
                              </Stack.Screen>
                        ) : (
                              <Stack.Screen 
                                    name="LogScreen" 
                                    component={LogScreen} 
                                    options={{ headerShown: false }} 
                              />
                        )}        
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
                        <Stack.Screen 
                              name="PyramidsScreen" 
                              component={PyramidsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="ReadPyramidScreen" 
                              component={ReadPyramidScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="SettingsScreen" 
                              component={SettingsScreen} 
                              options={{ headerShown: false }} 
                        />
                        <Stack.Screen 
                              name="RiddleScreen" 
                              component={RiddleScreen} 
                              options={{ headerShown: false }} 
                        />
                  </Stack.Navigator>
            </NavigationContainer>
      </MusicProvider>
    );
};

export default App;
