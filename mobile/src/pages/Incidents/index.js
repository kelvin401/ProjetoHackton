import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import logoImg from '../../assets/logo8.png'
import api from '../../services/api'

export default function Incidents() {
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigaton = useNavigation()

  function navigateToDetail(incident){
    navigaton.navigate('Detail', { incident })
  } 

  async function loadIncidents() {
    if (loading) {
      return 
    }
    if(total > 0 && incidents.length === total) {
      return 
    }

    setLoading(true)
      const response = await api.get('/incidents', {
        params: { page }
      })

      setIncidents([...incidents, ...response.data])
      setTotal(response.headers['x-total-count'])
      setPage(page + 1)
      setLoading(false)
  }

  useEffect(() => {  
    loadIncidents()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} eventos</Text>          
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>Eventos recomendados para você</Text>

      <FlatList
      data={incidents}
      style={styles.incidentList}
      showsVerticalScrollIndicator={false}
      onEndReached={loadIncidents}
      onEndReachedThreshold={0.2}
      keyExtractor={incident => String(incident.id)}
      renderItem={ ({ item: incident}) => (
        <View style={styles.incident}>
        <Image style={styles.image}>{incident.upload}</Image>
        <Text style={styles.incidentProperty}>REALIZAÇÃO:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>EVENTO:</Text>
        <Text style={styles.incidentValue}>{incident.description}</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigateToDetail(incident)}>
            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#fff" />
          </TouchableOpacity>
      
      </View>
      )} />

      
 
    </View>
  );
}
