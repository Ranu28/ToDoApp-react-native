import { StatusBar } from 'expo-status-bar';
import React ,{useState}from 'react';
import { SafeAreaView ,ScrollView,Keyboard,TouchableOpacity,TextInput,KeyboardAvoidingView,StyleSheet, Text, View } from 'react-native';
import Task from './components/Tasks';

export default function App() {

    const [task, setTask] = useState();
    const [taskItems, setTaskItems] = useState([]);

    const handlesAddTasks = ()=>{
        Keyboard.dismiss();
        setTaskItems([...taskItems,task]);
        setTask(null);
        // console.log(task);
    }

    const completeTask = (index)=>{
            let itemCopy = [...taskItems];
            itemCopy.splice(index,1);
            setTaskItems(itemCopy);
    }

    return ( 
    <SafeAreaView  style = { styles.container }>

        {/* today task */}
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}> Today's tasks </Text>
                <ScrollView style={styles.items}>
                {
                    taskItems.map((item,index)=>{
                        return (
                            <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                            <Task text={item} />
                            </TouchableOpacity>
                        )
                        
                    })
                }
                    
                  

                </ScrollView>
            </View>

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.writeTaskWrapper}>
            <TextInput style={styles.input} placeholder={'Write a task'}
             value={task} onChangeText={text=> setTask(text)} />

            <TouchableOpacity onPress={()=>handlesAddTasks()} >
                <View style={styles.addWrapper}>
                    <Text style={styles.addText}>+</Text>
                </View>
            </TouchableOpacity>

        </KeyboardAvoidingView>

    </SafeAreaView>
    
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        },
    taskWrapper:{
        marginTop: StatusBar.currentHeight || 20,
        paddingHorizontal:20
    },
    sectionTitle:{
        fontSize:28,
        fontWeight:'bold'
    },
    items:{
        marginTop:30
    },
    writeTaskWrapper:{
        position:'absolute',
        bottom:60,
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    input:{
        paddingVertical:15,
        paddingHorizontal:15,
        width:250,
        borderRadius:60,
        // padding:20,
        borderColor:'#C0C0C0',
        borderWidth:1,
        backgroundColor:'#FFF'
    },
    addWrapper:{
        width:60,
        height:60,
        backgroundColor:'#FFF',
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#C0C0C0',
        borderWidth:1,
    },
    addText:{},

});