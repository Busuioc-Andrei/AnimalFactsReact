import React from "react";
import { IAnimal, useAnimalContext } from "../context/AnimalContext";
import { Card, Text, Button, Title} from "react-native-paper";

const Animal: React.FC<{ animal: IAnimal }> = ({ animal }) => {
    const { id, name } = animal;
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
            <Card.Actions>
                <Button onPress={handlePress}>
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    )
};

export default Animal;