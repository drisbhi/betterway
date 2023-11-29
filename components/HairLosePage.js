
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, Platform, Animated } from 'react-native';
import { useTheme } from '@shopify/restyle';

const HairLossPage = ({ image, cardData }) => {
  const theme = useTheme();
  const screenWidth = Dimensions.get('window').width;
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9, // Scale down to 90%
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Scale back to 100%
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableOpacity
      style={{ 
        width: Platform.OS === 'web' ? 200 : screenWidth - 100, 
        height: Platform.OS === 'web' ? 300 : 150,
        borderRadius: 5,
        shadowColor: 'rgba(0, 0, 0, 0.04)',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden', 
       flexDirection: Platform.OS === 'web' ? 'column' : 'row',
        margin: 10,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', 
        transform: [{ scale: scaleValue }],
      }}
      activeOpacity={0.8}
      onPress={() => {
        console.log('clicked');
      }}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={{ flex: 0.9, overflow: 'hidden', borderRadius: 5  , justifyContent : 'center' , alignItems :'center'}}>
        <Image
          source={image} // Replace with the actual path to your image
          style={{ width: '100%', height: '100%'}}
          resizeMode="cover" // or "contain" based on your preference
        />
      </View>
      <View
        style={{
          flex: 0.4,
          backgroundColor: theme.cardBackground,
          padding: 8,
          justifyContent: 'center', // Center the text vertically
          alignItems: 'center', // Center the text horizontally
        }}
      >
        <Text style={{ color: theme.textColor }}>{cardData}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HairLossPage;
