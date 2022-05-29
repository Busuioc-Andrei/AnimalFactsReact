import React, { useState } from "react";
import { useAnimalContext } from "../context/AnimalContext";
import { TextInput, Button } from 'react-native-paper';
import { View } from "react-native";

const AnimalInput = () => {
    const [name, setName] = useState<string>('');
    const [imageUrl, setimageUrl] = useState<string>('');
    const { addAnimal } = useAnimalContext();

    const handlePress = () => {
        if (name) {
            addAnimal(name, imageUrl);
            setimageUrl('');
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
            <TextInput
                label="Image Url"
                onChangeText={setimageUrl}
                value={imageUrl}
            />
            <Button icon="plus" mode="contained" color="#2679ff" onPress={handlePress}>
                Add
            </Button>
        </View>
    )
}

export default AnimalInput;