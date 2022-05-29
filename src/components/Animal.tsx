import React from "react";
import { IAnimal, useAnimalContext } from "../context/AnimalContext";
import { Card, Button, Title} from "react-native-paper";

const Animal: React.FC<{ animal: IAnimal }> = ({ animal }) => {
    const { id, name, imageUrl } = animal;
    const { deleteAnimal } = useAnimalContext();

    const handlePress = () => {
        if (id) {
            deleteAnimal(id);
        }
    }

    return (
        <Card mode="outlined">
            <Card.Content>
                <Title>{name}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: imageUrl }} />
            <Card.Actions>
                <Button onPress={handlePress}>
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    )
};

export default Animal;