import React from "react";
import { IFact, useFactContext } from "../context/FactContext";
import { Card, Button, Title, Paragraph} from "react-native-paper";

const Fact: React.FC<{ Fact: IFact }> = ({ Fact }) => {
    const { id, description, animal } = Fact;
    const { deleteFact } = useFactContext();

    const handlePress = () => {
        if (id) {
            deleteFact(id);
        }
    }

    return (
        <Card mode="outlined">
            <Card.Title title={animal.name} />
            <Card.Content>
                <Paragraph>{description}</Paragraph>
            </Card.Content>
            <Card.Actions>
                <Button onPress={handlePress}>
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    )
};

export default Fact;