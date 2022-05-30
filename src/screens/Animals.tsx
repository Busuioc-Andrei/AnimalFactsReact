import React from "react";
import { Animated, SafeAreaView, ScrollView } from "react-native";
import Animal from "../components/Animal";
import { IAnimal, useAllAnimals } from "../context/AnimalContext";

const Animals = () => {
    const itemsToDisplay: IAnimal[] = useAllAnimals();
    
    return (
        <SafeAreaView>
            <Animated.ScrollView>
                {
                    itemsToDisplay.map((animal, index) => <Animal key={animal.id} animal={animal} />)
                }
            </Animated.ScrollView>
        </SafeAreaView>
    )
}

export default Animals;