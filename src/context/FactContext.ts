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
    allFacts: IFact[];
}

const FactContext = createContext<IFactContext>({
    addFact: () => { },
    deleteFact: () => { },
    allFacts: []
});

export const useFactContext = (): IFactContext => useContext(FactContext);
export const useAllFacts = (): IFact[] => {
    const { allFacts } = useContext(FactContext);
    return allFacts;
}

export default FactContext;