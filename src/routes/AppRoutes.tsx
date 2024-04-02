import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../screens/User";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();

export const HomeRoutes = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tarefas"
                component={Home}
                options={{
                    headerTitle: "Lista de Tarefas",                   
                }}
            />      
              
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

export const AppRoutes = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeRoutes}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="home" size={30} color="#4169E1" />
                    ),
                }}
            />
            <Tab.Screen
                name="User"
                component={User}
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons name="person" size={30} color="#4169E1" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};