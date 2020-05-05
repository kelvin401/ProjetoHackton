import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import logoImg from '../../assets/logo8.png'
import styles from './styles';
import  * as MailComposer from 'expo-mail-composer'

export default function Detail() {
  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident
  const ong = route.params.ong
  const message = `Ola ${incident.name}, estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`
  
  function navigateBack() {
    navigation.goBack()
  }

  function sendMail(){
    MailComposer.composeAsync({
      subject: `Heroi do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    })
  }

  function sendWhatsapp(){
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
         <TouchableOpacity onPress={navigateBack}>
           <Feather name="arrow-left" size={28} color="#007DF5" />
         </TouchableOpacity>
      </View>

      <View style={styles.incident}>
      <Text style={styles.incidentProperty, {fontWeight: "bold", marginTop: 0}}>PRODUTOR:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>EVENTO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Acesse o melhor da Plataforma!</Text>
        <Text style={styles.heroTitle1}>Tenha a melhor experiencia com eventos online sem sair de casa.</Text>

        <Text style={styles.heroDescription}>Streaming em 360° VR disponivel</Text>

        <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}> 
              <Text style={styles.actionText}>Convidar amigo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>Assistir</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
