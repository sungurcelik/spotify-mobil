import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import TrackPlayer, {
  AndroidAudioContentType,
  useProgress,
} from 'react-native-track-player';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const SongsScreen = () => {
  const navigation = useNavigation();
  const progress = useProgress();
  const [searchText, setSearchText] = useState('Türkiyede popüler müzikler');
  const [searchTracks, setSearchTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = async () => {
    const options = {
      method: 'GET',
      url: 'https://shazam.p.rapidapi.com/search',
      params: {
        term: searchText,
        locale: 'tr-TR',
        offset: '0',
        limit: '5',
      },
      headers: {
        'x-rapidapi-key': 'd7a41d3b70mshfd7e2063312d05fp19dc08jsnaf8e6e545dcc',
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      // console.log(JSON.stringify(response.data, null, 2));
      setSearchTracks(response.data.tracks.hits);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const setupPlayer1 = async () => {
    try {
      // Track player kütüphanesinin oynatıcıyı kurmasını sağladık. bu işlemde oynatıcıyı başlatmak için gerekli olan yapılandırma kuruldu.
      await TrackPlayer.setupPlayer();
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SEEK_TO, // 10sn sonrası
        ],
      });
    } catch (error) {
      console.log('Error setting up player:', error);
    }
  };

  const handlePlay = async track => {
    const trackData = {
      id: track.track.key,
      url: track.track.hub.actions.find(action => action.type === 'uri').uri,
      title: track.track.title,
      artist: track.track.subtitle,
      artwork: track.track.images.coverart,
    };
    try {
      await TrackPlayer.reset();
      await TrackPlayer.add(trackData);
      await TrackPlayer.play();
      setSelectedTrack(track.track);
      setModalVisible(true);
      setIsPlaying(true);
    } catch (error) {}
  };

  const formatTime = seconds => {
    // toplam saniyeyi dakikaya çevir
    const mins = Math.floor(seconds / 60);
    // toplam saniye sayısından geriye kalan saniyeyi hesaplar
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ' '}${secs}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      // parça oynatılıyorsa durdur
      await TrackPlayer.pause();
    } else {
      // parça duruyorsa oynat
      await TrackPlayer.play();
    }
    // isPlaying değerini oynatma ve durdurma butonu basıldığında tam tersine çevir
    setIsPlaying(!isPlaying);
  };

  // 10 sn ileri ve geri
  const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
  };

  const nextSong = async () => {
    await TrackPlayer.skipToNext();
  };

  useEffect(() => {
    handleSearch();
    setupPlayer1();
  }, []);

  return (
    <>
      <LinearGradient colors={['#614385', '#516395']} style={{flex: 1}}>
        <ScrollView style={{flex: 1, marginTop: 60}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Pressable
              onPress={() => navigation.goBack()}
              style={{marginHorizontal: 10}}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 10,
                borderRadius: 9,
              }}>
              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  height: 40,
                  backgroundColor: '#422775',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <AntDesign name="search1" size={24} color="white" />
                <TextInput
                  placeholderTextColor={'gray'}
                  placeholder="Find in Liked songs"
                  style={{
                    fontWeight: '500',
                    width: '85%',
                    color: 'white',
                  }}
                  onChangeText={setSearchText}
                  onSubmitEditing={handleSearch}
                />
              </Pressable>
            </Pressable>
          </View>

          <View style={{marginHorizontal: 10, marginVertical: 10}}>
            {/* <Text
              style={{
                fontSize: 18,
                color: 'white',
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              Search Songs
            </Text>
            <Text style={{fontSize: 13, color: 'white', marginTop: 5}}>
              {searchText.length}
            </Text> */}
          </View>

          {loading ? (
            <ActivityIndicator size={'large'} color={'gray'} />
          ) : (
            <FlatList
              data={searchTracks}
              keyExtractor={item => item.track.key}
              renderItem={({item}) => {
                return (
                  <Pressable onPress={() => handlePlay(item)}>
                    <View style={styles.trackContainer}>
                      <Image
                        source={{uri: item.track.images.coverart}}
                        style={styles.albumCover}
                      />
                      <View style={styles.trackInfo}>
                        <Text style={styles.trackName}>{item.track.title}</Text>
                        <Text style={styles.artistName}>
                          {item.track.subtitle}
                        </Text>
                      </View>
                      <Entypo name="controller-play" size={24} color="white" />
                    </View>
                  </Pressable>
                );
              }}
            />
          )}
        </ScrollView>
      </LinearGradient>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
        style={{margin: 0}}>
        <View
          style={{
            backgroundColor: '#5072A7',
            width: '100%',
            height: '100%',
            paddingTop: 60,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
              Songs
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View style={{padding: 10, marginTop: 20}}>
            <Image
              source={{uri: selectedTrack?.images.coverart}}
              style={{width: '100%', height: 350, borderRadius: 4}}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {selectedTrack?.title}
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {selectedTrack?.subtitle}
                </Text>
              </View>
              <AntDesign name="heart" size={24} color="#1DB954" />
            </View>

            <View style={{marginTop: 10}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 3,
                  backgroundColor: 'gray',
                  borderRadius: 5,
                }}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    width: 10,
                    height: 10,
                    backgroundColor: 'white',
                    borderRadius: 5,
                    left: `${(progress.position / progress.duration) * 100}%`,
                  }}
                />
              </View>

              <View
                style={{
                  marginTop: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.position)}
                </Text>
                <Text style={{color: 'white', fontSize: 15}}>
                  {formatTime(progress.duration)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 18,
                  alignItems: 'center',
                }}>
                <Pressable onPress={seekBackward}>
                  <Entypo
                    name="controller-fast-backward"
                    size={30}
                    color={'white'}
                  />
                </Pressable>
                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color={'white'} />
                </Pressable>
                <Pressable onPress={togglePlayback}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color={'white'} />
                  ) : (
                    <Entypo name="controller-play" size={60} color={'white'} />
                  )}
                </Pressable>
                <Pressable onPress={nextSong}>
                  <Ionicons
                    name="play-skip-forward"
                    size={30}
                    color={'white'}
                  />
                </Pressable>
                <Pressable onPress={seekForward}>
                  <Entypo
                    name="controller-fast-forward"
                    size={30}
                    color={'white'}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SongsScreen;

const styles = StyleSheet.create({
  trackContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  albumCover: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 10,
  },
  trackName: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 14,
    color: '#758694',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
  },
});
