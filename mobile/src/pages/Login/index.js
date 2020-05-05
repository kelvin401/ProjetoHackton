import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text,
  Animated} from 'react-native';

import styles from './styles';
import logoImg from '../../assets/logo6.png'
import api from '../../services/api'

export default function App() {
  const navigation = useNavigation()


  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
  
  useEffect(() => {
    Animated.spring(offset.y, {
      toValue: 0,
      speed: 4,
      bounciness: 30
    }).start();
  })
  return (
    <KeyboardAvoidingView style={styles.background}>
     <View style={styles.containerLogo}>
        <Image
        style={styles.image}
        source={logoImg}
        />
      </View>

      <Animated.View style={[styles.container,
      {
        transform: [
          {translateY: offset.y}
        ]
      }
      ]}>
        <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        onChangeText={() => {}}
         />

        <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        autoCorrect={false}
        onChangeText={() => {}}
         />

      <TouchableOpacity 
      onPress={() => navigation.navigate("Incidents")}
      style={styles.btnSubmit}>
        <Text style={styles.submitText}>Acessar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
     onPress={() => navigation.navigate("Register")} 
      style={styles.btnRegister}>
        <Text style={styles.registerText}>Criar Conta</Text>
      </TouchableOpacity>

      </Animated.View>
    </KeyboardAvoidingView>
  )
}