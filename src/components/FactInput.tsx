import React, { useState } from "react";
import { useFactContext } from "../context/FactContext";
import { TextInput, Button } from 'react-native-paper';
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useAllAnimalsLabelValue } from "../context/AnimalContext";
import { IItem } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";

const FactInput = () => {
    const [animalId, setAnimalId] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const { addFact } = useFactContext();
    const itemsToDisplay: IItem[] = useAllAnimalsLabelValue();

    const handlePress = () => {
        if (animalId && description) {
            addFact(animalId, description);
            setDescription('');
        }
    }

    return (
        <View>
            <RNPickerSelect
                 onValueChange={setAnimalId}
                 items={itemsToDisplay}
             />
            <TextInput
                label="Description"
                onChangeText={setDescription}
                value={description}
            />
            <Button icon="plus" mode="contained" color="#2679ff" onPress={handlePress}>
                Add
            </Button>
        </View>
    )
}

export default FactInput;