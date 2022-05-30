import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Fact from "../components/Fact";
import { getRandomFact, IFact, useFactContext } from "../context/FactContext";

const RandomFacts = ({navigation}: {navigation: any}) => {
    const { refresh } = useFactContext();
    React.useEffect(() => {
        const listener = navigation.addListener('tabPress', (e:Event) => {
          refresh();
        });
        return listener;
      }, [navigation]);

    const itemToDisplay: IFact | undefined = getRandomFact();
    
    if (itemToDisplay) 
        return (
            <SafeAreaView>
                {
                    <Fact Fact={itemToDisplay}></Fact>
                }
            </SafeAreaView>
        )
    else
        return (
            <SafeAreaView>
            </SafeAreaView>
        ) 
}

export default RandomFacts;