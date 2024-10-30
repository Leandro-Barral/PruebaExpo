import { useState } from "react";
import { Text, View, TextInput, StyleSheet, Pressable, FlatList, Image, ScrollView } from "react-native";

interface Task {
  id: number,
  text: string,
}

export default function Index() {

  const [counter, setCounter] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [nextTaskID, setNextTaskID] = useState(1);
  const [image, setImage] = useState(require('../assets/images/react-logo.png'))

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e0e0e0",
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    button: {
      width: 200,
      padding: 15,
      marginVertical: 10,
      borderRadius: 12,
      backgroundColor: "#e0e0e0",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
    buttonPressed: {
      backgroundColor: "#d4d4d4",
      shadowOffset: { width: -3, height: -3 },
    },
    buttonText: {
      fontSize: 18,
      color: "#333",
    },
    counter: {
      fontSize: 30,
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title} >TA1</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => { setCounter(prev => prev + 1) }}>
        <Text style={styles.buttonText}>Aumentar</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => { setCounter(prev => prev - 1) }}>
        <Text style={styles.buttonText}>Disminuir</Text>
      </Pressable>
      <Text style={styles.counter}>{counter}</Text>


      <Text style={styles.title} >TA2</Text>
      <TextInput placeholder="Escribí algo..." onChangeText={text => { setUserInput(text) }}></TextInput>
      <Text>{userInput}</Text>

      <Text style={styles.title} >TA3</Text>
      <TextInput placeholder="Agregar nueva tarea..." onChangeText={text => { setNewTaskText(text) }}></TextInput>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => {
          let newTask: Task = {
            id: nextTaskID,
            text: newTaskText
          };
          setNextTaskID(prev => prev + 1);
          setTaskList(prev => [...prev, newTask]);
          setNewTaskText("");
        }}>
        <Text>Agregar Tarea</Text>
      </Pressable>

      <FlatList
        data={taskList}
        renderItem={({ item }) =>
          <>
            <Text>{item.text}</Text>
            <Pressable
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              onPress={() => {
                setTaskList(prev => prev.filter(task => task.id !== item.id));
              }}
            >
              <Text style={styles.buttonText}>Borrar Tarea</Text>
            </Pressable>
          </>
        }
      />



      <Text style={styles.title}>TA4</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => setImage((prev: any) => 
          (prev === require('../assets/images/react-logo.png') 
          ? require('../assets/images/icon.png') 
          : require('../assets/images/react-logo.png')))}
      >
        <Text>Cambiar Imagen</Text>
      </Pressable>
      <Image source={image}/>
    </View>
  );
}
