import { createContext, useContext } from "react";

export interface IAnimal {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
  }

export interface IAnimalContext {
    addAnimal: (name: string) => void;
    deleteAnimal: (id: string) => void;
    allAnimals: IAnimal[];
}

const AnimalContext = createContext<IAnimalContext>({
    addAnimal: () => { },
    deleteAnimal: () => { },
    allAnimals: []
});

export const useAnimalContext = (): IAnimalContext => useContext(AnimalContext);
export const useAllAnimals = (): IAnimal[] => {
    const { allAnimals } = useContext(AnimalContext);
    return allAnimals;
}

export default AnimalContext;