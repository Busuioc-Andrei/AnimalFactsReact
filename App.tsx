import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimalContext, { IAnimal } from './src/context/AnimalContext';
import { DarkTheme, NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AnimalFactsNavigator from './src/screens/Index';
import { API_URL } from './src/constants';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AddAnimal from './src/screens/AddAnimal';
import AddFact from './src/screens/AddFact';
import FactContext, { IFact } from './src/context/FactContext';

const Drawer = createDrawerNavigator();

export default function App() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [facts, setFacts] = useState<IFact[]>([]);
  const [randomFact, setRandomFact] = useState<IFact>();
  const [refreshState, setRefreshState] = useState<Boolean>(false);

  const loadAnimals = async () => {
    const items = await fetch(`${API_URL}/crud/animals`)
      .then(res => res.json())
      .catch((e) => {
        console.log(e);
        return [];
      });
    setAnimals(items);
  }

  const addAnimal = async (name: string, imageUrl: string) => {
    await fetch(`${API_URL}/crud/animal`, {
      method: 'POST',
      body: JSON.stringify({ name, imageUrl }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await loadAnimals();
  }

  const deleteAnimal = async (id: string) => {
    await fetch(`${API_URL}/crud/animal?id=${id}`, {
      method: 'DELETE'
    });
    await loadAnimals();
  }


  const loadFacts = async () => {
    const items = await fetch(`${API_URL}/crud/facts`)
      .then(res => res.json())
      .catch((e) => {
        console.log(e);
        return [];
      });
    setFacts(items);
  }

  const addFact = async (animalId: string, description: string) => {
    await fetch(`${API_URL}/crud/${animalId}/fact`, {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    await loadFacts();
    await loadRandomFact();
  }

  const deleteFact = async (id: string) => {
    await fetch(`${API_URL}/crud/fact?id=${id}`, {
      method: 'DELETE'
    });
    await loadFacts();
    await loadRandomFact();
  }

  const loadRandomFact = async () => {
    const items = await fetch(`${API_URL}/random/fact`)
      .then(res => res.json())
      .catch((e) => {
        console.log(e);
        return ;
      });
    if(items)
      setRandomFact(items[0]);
    else
      setRandomFact(undefined);
  }

  const refresh = async () => {
    loadRandomFact();
  }

  useEffect(() => {
    loadAnimals();
    loadFacts();
    loadRandomFact();
  }, [])

  return (
    <PaperProvider>
      <AnimalContext.Provider value={{
        addAnimal,
        deleteAnimal,
        allAnimals: animals
      }}>
        <FactContext.Provider value={{
          addFact,
          deleteFact,
          refresh,
          aRandomFact: randomFact,
          allFacts: facts
        }}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Browse">
            <Drawer.Screen name="Browse" component={AnimalFactsNavigator} />
            <Drawer.Screen name="Add Animal" component={AddAnimal} />
            <Drawer.Screen name="Add Fact" component={AddFact} />
          </Drawer.Navigator>
        </NavigationContainer>
        </FactContext.Provider>
      </AnimalContext.Provider>
    </PaperProvider>
  );
}