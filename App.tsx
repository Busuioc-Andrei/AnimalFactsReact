import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native";
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [data, setData] = useState<Animal[]>([]);
  const [input, setInput] = useState<string>('');

  interface Animal {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
  }

  const Container = styled.View`
    width: 100%;
    flex-direction: row;
  `;

  const Input = styled.TextInput`
      flex: 1;
      height: 50px;
      border: 1px solid;
      padding: 4px;
      border-radius: 4px;
      margin-right: 12px
  `;

  const rootUrl = 'http://192.168.0.105:8080/';

  const getAnimals = async () => {
    try {
      const response = await fetch(rootUrl + 'crud/animals');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  }

  const postAnimal = async (name: string) => {
    try {
      const response = fetch(rootUrl + 'crud/animal', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handlePress = () => {
    if (input) {
      postAnimal(input);
      setInput('');
    }
  }

  useEffect(() => {
    getAnimals();
  }, [input]);

  return (
    <SafeAreaView style={styles.container}>
      <Container>
        <Input
          onChangeText={setInput}
          value={input}
        />
        <Button
          onPress={handlePress}
          title='create'
          color='#841584'
        />
       </Container>
       <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.id} {item.name}</Text>
          )}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});