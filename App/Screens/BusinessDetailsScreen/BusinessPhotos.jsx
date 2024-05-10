import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Heading from '../../Components/Heading';

export default function BusinessPhotos({ business }) {
  return (
    <View style={styles.container}>
      <Heading text="Photos" />
      <View style={styles.imageContainer}>
        {business.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.url }}
            style={styles.image}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: '48%', 
    height: 130, 
    marginBottom: 10,
    borderRadius: 15,
  },
});
