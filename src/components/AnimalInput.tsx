import React, { useState } from "react";
import { useAnimalContext } from "../context/AnimalContext";
import { TextInput, Button } from 'react-native-paper';
import { View } from "react-native";

const AnimalInput = () => {
    const [name, setName] = useState<string>('');
    const { addAnimal } = useAnimalContext();

    const handlePress = () => {
        if (name) {
            addAnimal(name);
            setName('');
        }
    }

    return (
        <View>
            <TextInput
                label="Name"
                onChangeText={setName}
                value={name}
            />
            <Button icon="plus" mode="contained" color="#2679ff" onPress={handlePress}>
                Add
            </Button>
        </View>
    )
}

export default AnimalInput;