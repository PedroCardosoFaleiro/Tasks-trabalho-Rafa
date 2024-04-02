import React, { useContext, useEffect, useState } from "react";
import { 
    FlatList, 
    StyleSheet, 
    TouchableOpacity, 
    Text, 
    View,
    TextInput
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuid } from "uuid";
import DropDownPicker from "react-native-dropdown-picker";
import { categories } from "../utils/data";
import ItemCard from "../components/ItemCard";
import CategoryItem from "../components/CategoryItem";
import { UserContext } from "../contexts/UserContext";
import { Task } from '../types/Task';
import * as SQLite from 'expo-sqlite';

const openDatabase = () => SQLite.openDatabase("db.db");
const db = openDatabase();

const Menu = () => {
    const { user } = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [categoryValue, setCategoryValue] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState<Task[]>([]);

    const getTasks = async () => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, {rows: {_array}}) => {
                    setTaskList(_array);
                }
            );
        });
    };

    const handleAddTask = async () => {
        if (taskInput !== "" && categoryValue) {
            console.log('add', taskInput, categoryValue)
            db.transaction((tx) => {
                tx.executeSql(
                    "insert into tasks (completed, title, category) values (0, ?, ?)",
                    [taskInput, categoryValue]
                );
                tx.executeSql(
                    `select * from tasks where completed = 0;`,
                    [],
                    (_, {rows: {_array}}) => {
                        setTaskList(_array);
                    }
                );
            });
        }
        // Limpar os inputs
        setTaskInput("");
        setCategoryValue(null);
    };

    const handleRemoveTask = (id: number) => {
        db.transaction((tx) => {
            tx.executeSql("delete from tasks where id = ?", [id]);
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, {rows: {_array}}) => {
                    setTaskList(_array);
                }
            );
        });
    };

    const handleDoneTask = async (taskId: number) => {
        db.transaction((tx) => {
            tx.executeSql("update tasks set completed = ? where id = ? ", [1, taskId]);
            tx.executeSql(
                `select * from tasks where completed = 0;`,
                [],
                (_, {rows: {_array}}) => {
                    setTaskList(_array);
                }
            );
        });
    };



    const getTasksByCategory = (category: string) => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 0 and category = ?;`,
                [category],
                (_, {rows: {_array}}) => {
                    setTaskList(_array);
                }
            );
        });
    };
    
    const getCompletedTasks = () => {
        db.transaction((tx) => {
            tx.executeSql(
                `select * from tasks where completed = 1;`,
                [],
                (_, {rows: {_array}}) =>{
                    setTaskList(_array);
                }
            );
        });
    };

    const handleSelectedCategory = (type: string) => {
        setSelectedCategory(type);
    
        switch (type) {
            case 'all':
                getTasks();
                break;
            case 'done':
                getCompletedTasks();
                break;
            default:
                getTasksByCategory(type);
                break;
        }
    };   

    useEffect(() => {
        db.transaction((tx) => {
        
            tx.executeSql(
                "create table if not exists tasks (id integer primary key not null, completed int, title text, category text);"
            );
        });
        getTasks();
    }, []);

    console.log(taskList)

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.taskInput}
                    placeholder="Adicione uma nova tarefa"
                    onChangeText={setTaskInput}
                    value={taskInput}
                />
            </View>

            <View style={styles.header}>
                <DropDownPicker
                    style={styles.dropdown}
                    open={open}
                    value={categoryValue}
                    items={categories.filter(
                        (c) => c.value !== "all" && c.value !== "done"
                    )}
                    setOpen={setOpen}
                    setValue={setCategoryValue}
                    placeholder="Escolha uma categoria"
                    theme="DARK"
                    placeholderStyle={styles.placeholderStyle}
                    listItemLabelStyle={styles.listItemLabelStyle}
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    selectedItemContainerStyle={styles.selectedItemContainerStyle}
                    selectedItemLabelStyle={styles.selectedItemLabelStyle}
                />
            </View>
            <TouchableOpacity style={styles.sendButton} onPress={handleAddTask}>
                <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>

            <View style={styles.categoryList}>
                <FlatList
                    data={categories}
                    renderItem={({ item }) => (
                        <CategoryItem
                            item={item}
                            handleSelectCategory={handleSelectedCategory}
                            selectedCategory={selectedCategory}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <FlatList 
                data={taskList}
                renderItem={({ item }) => (
                    <ItemCard  
                        task={item} 
                        handleRemoveTask={handleRemoveTask} 
                        handleDoneTask={handleDoneTask}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tasksFind: {
        color: "#252525"
    },
    inputContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: 20,
    },
    taskInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 16,
    },
    header: {
        paddingHorizontal: 20,
    },
    dropdown: {
        flex: 1,
        marginTop: 20,
        marginBottom: 50,
    },
    sendButton: {
        backgroundColor: 'blue',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categoryList: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    placeholderStyle: {
        color: "#ccc",
        fontSize: 16,
    },
    listItemLabelStyle: {
        color: "#fff",
        fontSize: 16,
        paddingLeft: 15,
    },
    dropDownContainerStyle: {
        backgroundColor: "#11212D",
    },
    selectedItemContainerStyle: {
        backgroundColor: "#1c2541",
    },
    selectedItemLabelStyle: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#252525",
    },
});
