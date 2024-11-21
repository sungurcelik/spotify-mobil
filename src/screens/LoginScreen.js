import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient colors={['#040306', '#131624']} style={{flex: 1}}>
      <SafeAreaView>
        <View style={{height: 80}} />
        <Entypo
          name="spotify"
          color="#1DB954"
          size={80}
          style={{textAlign: 'center'}}
        />
        <Text style={styles.loginTitle}>
          Millions of Songs Free on{' '}
          <Text style={{color: '#1DB954'}}>Spotify</Text>
        </Text>
        <View style={{height: 80}} />
        <Pressable style={styles.loginButton}>
          <Text style={styles.buttonText}>Sign up free</Text>
        </Pressable>
        <Pressable style={[styles.button, {justifyContent: 'space-between'}]}>
          <View>
            <AntDesign name="google" size={24} color="#EA4335" />
          </View>
          <Text style={styles.buttonText}>Continue with Google</Text>
          <View />
        </Pressable>
        <Pressable style={[styles.button, {justifyContent: 'space-between'}]}>
          <View>
            <Ionicons name="logo-facebook" size={24} color="#1877F2" />
          </View>
          <Text style={styles.buttonText}>Continue with Facebook</Text>
          <View />
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Main')}>
          <Text style={styles.login}>Log in</Text>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loginTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    padding: 12,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 330,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#131624',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    borderColor: '#C0C0C0',
    width: 330,
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  login: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
