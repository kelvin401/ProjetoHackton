import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  View, 
  Image, 
  TextInput, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
  } from 'react-native';

import styles from './styles';
import logoImg from '../../assets/logo7.png'
import api from '../../services/api'
const navigation = useNavigation()

export default function App() {
   return (
    <KeyboardAvoidingView style={styles.background}>
    
      <View style={styles.containerLogo}>
        <Image
        style={styles.image}
        source={logoImg}
        />
      </View>

      <View style={styles.containerInput}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Email"
        autoCorrect={false}
        onChangeText={() => {}}
        />

        <TextInput
        style={styles.input}
        placeholder="Senha"
        autoCorrect={false}
        onChangeText={() => {}}
        />
         <TextInput
        style={styles.input}
        placeholder="Confirma Senha"
        autoCorrect={false}
        onChangeText={() => {}}
        />
         <TouchableOpacity style={styles.btnSubmit}>
        <Text style={styles.submitText}>Cadastrar</Text>
      </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  )
}