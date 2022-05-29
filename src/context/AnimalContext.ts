import { IItem } from "native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types";
import { createContext, useContext } from "react";

export interface IAnimal {
    id: string;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    imageUrl: string;
  }

export interface IAnimalContext {
    addAnimal: (name: string, imageUrl: string) => void;
    deleteAnimal: (id: string) => void;
    allAnimals: IAnimal[];
}

const AnimalContext = createContext<IAnimalContext>({
    addAnimal: () => { },
    deleteAnimal: () => { },
    allAnimals: []
});

export const useAnimalContext = (): IAnimalContext => useContext(AnimalContext);

export const useAllAnimalsLabelValue = (): IItem[] => {
    const { allAnimals } = useContext(AnimalContext);
    const allAnimalsLabelValue = allAnimals.map(animal => ({...animal, label:animal.name, value:animal.id})) as IItem[]
    return allAnimalsLabelValue;
}
export const useAllAnimals = (): IAnimal[] => {
    const { allAnimals } = useContext(AnimalContext);
    return allAnimals;
}

export default AnimalContext;