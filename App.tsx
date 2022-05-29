import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimalContext, { IAnimal } from './src/context/AnimalContext';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AnimalFactsNavigator from './src/screens/Index';
import { API_URL } from './src/constants';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AddAnimal from './src/screens/AddAnimal';

const Drawer = createDrawerNavigator();

export default function App() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);

  const loadAnimals = async () => {
    const items = await fetch(`${API_URL}/crud/animals`)
      .then(res => res.json())
      .catch((e) => {
        console.log(e);
        return [];
      });
    setAnimals(items);
  }

  const addAnimal = async (name: string) => {
    await fetch(`${API_URL}/crud/animal`, {
      method: 'POST',
      body: JSON.stringify({ name }),
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

  useEffect(() => {
    loadAnimals();
  }, [])

  return (
    <PaperProvider>
      <AnimalContext.Provider value={{
        addAnimal,
        deleteAnimal,
        allAnimals: animals
      }}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Browse">
            <Drawer.Screen name="Browse" component={AnimalFactsNavigator} />
            <Drawer.Screen name="Add Animal" component={AddAnimal} />
          </Drawer.Navigator>
        </NavigationContainer>
      </AnimalContext.Provider>
    </PaperProvider>
  );
}