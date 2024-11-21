import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Loader from '../components/Loader';
import {ArtistsContext} from '../context/ArtistsContext';
import ArtistsCard from '../components/ArtistsCard';
import {AlbumsContext} from '../context/AlbumsContext';
import AlbumsCard from '../components/AlbumsCard';
import Error from '../components/Error';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation()
  const {artists, loading, error} = useContext(ArtistsContext);
  const {
    albums,
    loading: albumsLoading,
    error: albumsError,
  } = useContext(AlbumsContext);
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      {albumsLoading ? (
        <Loader />
      ) : albumsError ? (
        <Error error={albumsError} />
      ) : (
        <SafeAreaView>
          <ScrollView>
            <View>
              {/* PROFILE IMAGE */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 5,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons name="person-circle" size={65} color="white" />
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 25,
                      fontWeight: 'bold',
                      marginLeft: 5,
                    }}>
                    Sungur
                  </Text>
                </View>
                <View>
                  <MCI name="lightning-bolt-outline" size={35} color="white" />
                </View>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <View
                  style={{
                    backgroundColor: '#282828',
                    padding: 7,
                    borderRadius: 20,
                    marginLeft: 10,
                  }}>
                  <Text style={{color: 'white'}}>Music</Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#282828',
                    padding: 7,
                    borderRadius: 20,
                    marginLeft: 20,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    Podcast & Shows
                  </Text>
                </View>
              </View>
              <View>
                {/* Liked Songs */}
                <Pressable onPress={()=>navigation.navigate("Songs")} style={styles.likedSongs}>
                  <LinearGradient
                    style={{borderRadius: 4}}
                    colors={['#33006F', '#FFFFFF']}>
                    <Pressable
                      style={{
                        width: 55,
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="heart" color="white" size={24} />
                    </Pressable>
                  </LinearGradient>
                  <Text style={styles.likedSongsText}>Songs</Text>
                </Pressable>
                {/* Hippop */}
                <Pressable style={styles.likedSongs}>
                  <LinearGradient
                    style={{borderRadius: 4}}
                    colors={['#33006F', '#FFFFFF']}>
                    <Pressable
                      style={{
                        width: 55,
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Entypo name="moon" color="white" size={24} />
                    </Pressable>
                  </LinearGradient>
                  <Text style={styles.likedSongsText}>Rock</Text>
                </Pressable>
                {/* name */}
                <Pressable style={styles.likedSongs}>
                  <LinearGradient
                    style={{borderRadius: 4}}
                    colors={['#33006F', '#FFFFFF']}>
                    <Pressable
                      style={{
                        width: 55,
                        height: 55,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="star" color="white" size={24} />
                    </Pressable>
                  </LinearGradient>
                  <Text style={styles.likedSongsText}>Jazz</Text>
                </Pressable>
              </View>

              <Text style={styles.sectionTitle}>Your Top Artists</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {
                artists?.map((artist, index) => (
                  <ArtistsCard key={index} artist={artist} />
                ))
                }
              </ScrollView>
              <View style={{height: 10}} />
              <Text style={styles.sectionTitle}>Populer Albums</Text>
              <ScrollView horizontal>
                {albums?.map((album, index) => (
                  <AlbumsCard key={index} albums={album} />
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  sectionTitle: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 10,
  },
  likedSongs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 4,
    marginHorizontal: 10,
    marginVertical: 8,
    backgroundColor: '#202020',
  },
  likedSongsText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
