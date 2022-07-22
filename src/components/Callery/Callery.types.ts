import {Asset} from 'react-native-image-picker';

export interface GalleryProps {
  imgs: Asset[];
  onPress: (uri: string) => void;
}
