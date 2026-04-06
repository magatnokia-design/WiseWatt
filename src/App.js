// Main App Entry
import React from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './navigation/AppNavigator';
import { COLORS } from './constants/colors';

export default function App() {
  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor={COLORS.white}
      />
      <AppNavigator />
    </>
  );
}