// Theme Constants
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SIZES = {
  // Screen dimensions
  width,
  height,
  
  // Font sizes
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  body: 14,
  small: 12,
  
  // Spacing
  padding: 16,
  margin: 16,
  radius: 12,
  
  // Component sizes
  buttonHeight: 50,
  inputHeight: 50,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, fontWeight: 'bold' },
  h2: { fontSize: SIZES.h2, fontWeight: 'bold' },
  h3: { fontSize: SIZES.h3, fontWeight: '600' },
  h4: { fontSize: SIZES.h4, fontWeight: '600' },
  body: { fontSize: SIZES.body, fontWeight: 'normal' },
  small: { fontSize: SIZES.small, fontWeight: 'normal' },
};