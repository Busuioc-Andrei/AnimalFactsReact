import React from "react";
import { SafeAreaView } from "react-native";
import FactInput from "../components/FactInput";

const AddFact = () => {
    // throw new Error('Testing error boundary');

    return (
        <SafeAreaView>
            <FactInput />
        </SafeAreaView>
    )
}

export default AddFact;