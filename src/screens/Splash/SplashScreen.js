// Splash Screen
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';
import { FONTS } from '../../constants/theme';

export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚡</Text>
      <Text style={styles.title}>WattWise</Text>
      <Text style={styles.subtitle}>Smart Energy Monitoring</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    ...FONTS.h1,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body,
    color: COLORS.white,
    opacity: 0.9,
  },
});