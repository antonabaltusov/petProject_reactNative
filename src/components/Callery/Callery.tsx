import React from 'react';
import {Image, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GalleryProps} from './Callery.types';
import {styles} from './Gallery.styles';

export const Gallery = ({imgs, onPress}: GalleryProps) => (
  <View style={styles.container}>
    {imgs.map(img => (
      <TouchableOpacity
        style={styles.imgWrapper}
        onPress={() => onPress(img.uri)}
        key={img.fileName}>
        <Image source={{uri: img.uri}} style={styles.image} />
      </TouchableOpacity>
    ))}
  </View>
);
