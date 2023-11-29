import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@shopify/restyle';
import HairLossPage from './components/HairLosePage';
import { View, Text, Animated, Platform, useWindowDimensions, TouchableOpacity, Linking, Button } from 'react-native';

// Define your theme
const themes = {
  light: {
    backgroundColor: 'white',
    textColor: 'black',
    cardBackground: 'white',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
  },
  dark: {
    backgroundColor: 'black',
    textColor: 'white',
    cardBackground: 'black',
    shadowColor: 'rgba(255, 255, 255, 0.1)',
  },
};

const cardData = [
  {
    image: require('./assets/image1.png'),
    text: 'Along the Hairline',
  },
  {
    image: require('./assets/image2.png'),
    text: 'At the Crown',
  },
  {
    image: require('./assets/image3.png'),
    text: 'All Over',
  },
];

const App = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [isLightTheme, setIsLightTheme] = useState(false);
  const windowWidth = useWindowDimensions().width;

  // Animated values
  const cardOpacity = new Animated.Value(windowWidth < 1000 ? 1 : 0);

  // Fade in animation function
  const fadeInAnimation = () => {
    if (windowWidth >= 1000) {
      // Set opacity to 1 immediately if the screen width is greater than or equal to 1000
      cardOpacity.setValue(1);
    } else {
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    fadeInAnimation();
  }, [windowWidth]);

  // Update currentTheme when isLightTheme changes
  useEffect(() => {
    setCurrentTheme(isLightTheme ? 'light' : 'dark');
  }, [isLightTheme]);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginTop: Platform.OS === 'web' ? 0 : 20,
          backgroundColor: themes[currentTheme].backgroundColor,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            maxWidth: Platform.OS === 'web' ? '25%' : '90%',
            textAlign: 'center',
           color : themes[currentTheme].textColor 
          }}
        >
          Where are you noticing hair loss?
        </Text>
        <Animated.View
          style={{
            flexDirection: windowWidth < 900 ? 'column' : 'row',
            justifyContent: 'center',
            opacity: cardOpacity,
          }}
        >
          {cardData.map((item) => (
            <HairLossPage key={item.text} image={item.image} cardData={item.text} />
          ))}
        </Animated.View>
        <View style={{ marginTop: '15%', flexDirection: 'row'}}>
        <Text style={{  color : themes[currentTheme].textColor }}>
          Already have an account?
         </Text>

          <TouchableOpacity onPress={() => Linking.openURL('your_sign_in_link')}>
            <Text style={{ color: '#c59980', marginLeft: 5 }}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View>
       <TouchableOpacity onPress={toggleTheme}>
       <Text style={{ color: isLightTheme ? 'black' : 'white' }}>
         {isLightTheme ? 'Light Mode' : 'Dark Mode'}
       </Text>
       </TouchableOpacity>
      </View>
      </View>
     
    </ThemeProvider>
  );
};

export default App;
