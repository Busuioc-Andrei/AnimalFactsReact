import { createContext, useContext } from "react";
import { IAnimal } from "./AnimalContext"

export interface IFact {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    description: string;
    animal: IAnimal;
  }

export interface IFactContext {
    addFact: (animalId: string, description: string) => void;
    deleteFact: (id: string) => void;
    refresh: () => void;
    aRandomFact: IFact | undefined;
    allFacts: IFact[];
}

const FactContext = createContext<IFactContext>({
    addFact: () => { },
    deleteFact: () => { },
    refresh: () => { },
    aRandomFact: undefined,
    allFacts: []
});

export const useFactContext = (): IFactContext => useContext(FactContext);

export const getRandomFact = (): IFact | undefined => {
    const { aRandomFact } = useContext(FactContext);
    return aRandomFact;
}

export const useAllFacts = (): IFact[] => {
    const { allFacts } = useContext(FactContext);
    return allFacts;
}

export default FactContext;