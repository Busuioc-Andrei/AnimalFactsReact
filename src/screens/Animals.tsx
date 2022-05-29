import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Animal from "../components/Animal";
import { IAnimal, useAllAnimals } from "../context/AnimalContext";

const Animals = () => {
    const itemsToDisplay: IAnimal[] = useAllAnimals();
    
    return (
        <SafeAreaView>
            <ScrollView>
                {
                    itemsToDisplay.map((animal, index) => <Animal key={animal.id} animal={animal} />)
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default Animals;