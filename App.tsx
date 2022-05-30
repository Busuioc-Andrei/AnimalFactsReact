import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import AnimalContext, { IAnimal } from './src/context/AnimalContext';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AnimalFactsNavigator from './src/screens/Index';
import { API_URL } from './src/constants';
import { Provider as PaperProvider } from 'react-native-paper';
import AddAnimal from './src/screens/AddAnimal';
import AddFact from './src/screens/AddFact';
import FactContext, { IFact } from './src/context/FactContext';
import { LayoutAnimation } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import LoginGoogle from './src/screens/LoginGoogle';
import UserContext, { IUser } from './src/context/UserContext';
import { fetchUserInfoAsync, TokenResponse } from 'expo-auth-session';

const Drawer = createDrawerNavigator();
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [facts, setFacts] = useState<IFact[]>([]);
  const [randomFact, setRandomFact] = useState<IFact>();
  const [userToken, setUserToken] = useState<TokenResponse>();
  const [accessToken, setAccessToken] = useState<string>('');
  const [user, setUser] = useState<IUser>();

  
  const setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 250,
      update: {
        type: LayoutAnimation.Types.easeIn,
        springDamping: 0.7,
      },
    });
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        type: LayoutAnimation.Types.easeIn,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
    });
  };



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
    setAnimation();
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
    // console.log(userToken);
    // console.log(accessToken);
    await loadRandomFact();
  }

  const loadToken = async (token: TokenResponse) => {
    setUserToken(token);
    const { accessToken } = token;
    setAccessToken(accessToken); //weird interaction, if I remove this line, setUserToken(token) does not save the TokenResponse
    await loadUserData();
  }

  const loadUserData = async() => {
    const item = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }).then(res => res.json())
      .catch((e) => {
        console.log(e);
        return ;
      });
    setUser(item);
  }

  useEffect(() => {
    loadAnimals();
    loadFacts();
    loadRandomFact();
  }, [])


  return (
    <PaperProvider>
      <UserContext.Provider value={{
        loadToken,
        user: user
      }}>
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
              <Drawer.Screen name="Login with Google" component={LoginGoogle} />
            </Drawer.Navigator>
          </NavigationContainer>
          </FactContext.Provider>
        </AnimalContext.Provider>
      </UserContext.Provider>
    </PaperProvider>
  );
}