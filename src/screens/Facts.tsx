import React from "react";
import { Animated, SafeAreaView, ScrollView } from "react-native";
import Fact from "../components/Fact";
import { IFact, useAllFacts } from "../context/FactContext";

const Facts = () => {
    const itemsToDisplay: IFact[] = useAllFacts();
    
    return (
        <SafeAreaView>
            <Animated.ScrollView>
                {
                    itemsToDisplay.map((fact, index) => <Fact key={fact.id} Fact={fact} />)
                }
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default Facts;