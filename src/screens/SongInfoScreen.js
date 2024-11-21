import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';

const SongInfoScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Homescreenden gönderilen veriyi useRoute ile aldık
  const {albums} = route.params;

  // Gelen verileri parçalayarak aldık
  const {coverArt, name, artist, year} = albums;
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex:1}} >
      <SafeAreaView>
        <ScrollView>
          <View style={styles.paddingView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.imageView}>
              <Image
                source={{uri: albums.coverArt}}
                style={styles.coverImage}
              />
            </View>
          </View>
          <Text style={styles.albumNameText}>{name}</Text>
          <View style={styles.artistView}>
            <Text style={styles.artistText}>{artist}</Text>
          </View>

          <Pressable style={styles.controllView}>
            <Pressable style={styles.downloadButton}>
              <AntDesign name="arrowdown" size={28} color="white" />
            </Pressable>
            <View style={styles.playButtonView}>
              <MCI name="cross-bolnisi" size={28} color="#1DB954" />
              <Pressable style={styles.playButton}>
                <Entypo name="controller-play" size={28} color="white" />
              </Pressable>
            </View>
          </Pressable>
          <View>
            <View style={styles.infoView}>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Album: {name} </Text>
                <Text style={styles.infoText}>Artist: {artist} </Text>
                <Text style={styles.infoText}>Year: {year} </Text>
              </View>
              <Entypo name="dots-three-vertical" size={28} color="white" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SongInfoScreen;

const styles = StyleSheet.create({
  paddingView: {
    padding: 10,
  },
  coverImage: {
    width: 200,
    height: 200,
  },
  imageView: {
    alignItems: 'center',
  },
  albumNameText: {
    color: 'white',
    marginHorizontal: 12,
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  artistView: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  artistText: {
    color: '#909090',
    fontSize: 13,
    fontWeight: 'bold',
  },
  controllView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  downloadButton: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: '50%',
  },
  playButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playButton: {
    backgroundColor: '#1DB954',
    padding: 20,
    borderRadius: '50%',
  },
  infoView: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginVertical:20,
    marginHorizontal:10
    
  },
  infoContainer: {
    gap:5
  },
  infoText: {
    color:"white",
    fontSize:23
  },
});
