import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Fontisto} from '@expo/vector-icons';
import { Button } from "react-native-paper";
// import RandomFact from './RandomFact';
import Animals from './Animals';
import Facts from './Facts';

const Tab = createBottomTabNavigator();

const AnimalFactsNavigator = () => {
    
    return (
        <Tab.Navigator initialRouteName='Animals'>
            <Tab.Screen name="Animals" component={Animals} 
            options={{
                tabBarIcon: ({color}) => (<MaterialCommunityIcons name="panda" size={24} color={color} />),
            }}
            />
            <Tab.Screen name="Facts" component={Facts} options={{
                tabBarIcon: ({color}) => (<Fontisto name="question" size={24} color={color} />),
            }}/>
        </Tab.Navigator>
    )
}

export default AnimalFactsNavigator;