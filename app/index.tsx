import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Image, Easing } from 'react-native';
import { router, useRouter } from 'expo-router';
export default function HeartBeatOnceRotation() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
const router = useRouter()
  useEffect(() => {
    // Fade in once
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Rotate once
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1500, // 1.5 seconds rotation
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      // After rotation finishes, start infinite heartbeat
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
 
 
 
 const timer = setTimeout(() => {  
 
  router.replace("/onboarding");
},   2000 )
 
 
 return () => clearTimeout(timer)
 
 
 
 
 
  }, []);

  // Interpolate rotation (0 → 1 maps to 0° → 360°)
  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  
  
  
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/images/LogoappLogo.png')}
        style={{
          width: 150,
          height: 150,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { rotate: spin }],
        }}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C7B70',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
