import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Fact from "../components/Fact";
import { IFact, useAllFacts } from "../context/FactContext";

const Facts = () => {
    const itemsToDisplay: IFact[] = useAllFacts();
    
    return (
        <SafeAreaView>
            <ScrollView>
                {
                    itemsToDisplay.map((fact, index) => <Fact key={fact.id} Fact={fact} />)
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Facts;