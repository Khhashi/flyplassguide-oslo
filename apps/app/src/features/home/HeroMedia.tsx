import { Image, StyleSheet } from 'react-native';

// Foto: Gustavo Fring / Pexels (fri bruk, også kommersielt).
const heroImage = require('../../../assets/hero/terminal.jpg');

/** Bakgrunn for toppboksen. På mobil et stillbilde, på nett en video (se HeroMedia.web.tsx). */
export function HeroMedia() {
  return (
    <Image
      source={heroImage}
      resizeMode="cover"
      accessible={false}
      style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}
    />
  );
}
