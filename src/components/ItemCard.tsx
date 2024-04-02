import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { Task } from "../types/Task";
import { categories } from "../utils/data";

interface Props {
    task: Task;
    handleRemoveTask: (id: number) => void;
    handleDoneTask: (id: number) => void;
}

const ItemCard = ({ task, handleRemoveTask, handleDoneTask }: Props) => {
    const category = categories.filter((c) => c.value === task.category);

    const handleDelete = () => {
        Alert.alert("Tarefas", "Tem certeza que deseja excluir esta tarefa?", [
            {
                text: "Nãoooo",
                style: "cancel",
            },
            { text: "Simmmm", onPress: () => handleRemoveTask(task.id)},         
        ]);
    };
    const LeftAction = () => {
        return (
            <View style={styles.swipeLeft}>
                <MaterialIcons
                name="done"
                size={20}
                color="#252525"
                onPress={() => handleDoneTask(task.id)}
            />
            </View>
        );
    };

    const RightAction = () => {
        return (
            <View style={styles.swipeRight}>
                <MaterialIcons
                    name="delete"
                    size={20}
                    color="#252525"
                    onPress={handleDelete}
                />
            </View>
        );
    };
    return (
        <Swipeable renderLeftActions={LeftAction}
         renderRightActions={RightAction}>
            <View style={{flexDirection: 'row', backgroundColor: '#252525', height: 50}}>
                <View
                style={{
                    borderStyle:"solid",
                    height: '100%',
                    borderLeftWidth: 6,
                    borderColor: category[0].color,
                    marginRight: 10,
                    
                    
                }}
                />
                <Text style={{color: '#fafafa'}} >{task.title}</Text>
            </View>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    title: {
        color: "black"
    },
    swipeRight: {

    },
    swipeLeft: {

    }
})

export default ItemCard;
