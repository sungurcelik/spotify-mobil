import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const AlbumsCard = ({albums}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Info', {albums})}
      style={styles.albumContainer}>
      <Image source={{uri: albums.coverArt}} style={styles.albumImage} />
      <Text numberOfLines={1} style={styles.albumName}>{albums.name}</Text>
      <Text numberOfLines={1} style={styles.albumArtist}>{albums.artist}</Text>
    </TouchableOpacity>
  );
};

export default AlbumsCard;

const styles = StyleSheet.create({
  albumContainer: {
    width: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  albumImage: {
    width: 100,
    height: 100,
  },
  albumName: {
    color: 'white',
    marginTop: 7,
  },
  albumArtist: {
    color: 'gray',
    fontSize: 12,
  },
});
