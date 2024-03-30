import { StyleSheet, Text, View, Pressable, TextInput, FlatList} from 'react-native';


// UseEffect has 2 purposes
// a. useEffect is automatically triggered when a state variable changes 
// --> that forces teh screen to refresh
// b. useEffect can be used to execute any code you want to run
// when the screen first loads (onAppear, viewDidLoad())
import { useState, useEffect } from "react"

// 1. Import the db variable from firebaseConfig
import { db } from '../firebaseConfig';

// 2. Import the relevant functions from firestore
import { collection, getDocs, query, where } from "firebase/firestore";


export default function MyRentalListScreen() {

    // state variable for the text box
    const [nameFromUI, setNameFromUI] = useState("")

    // state variable to store the data that should be display in the list
    const [studentsList, setStudentsList] = useState([])

    // useEffect() run every time the screen triggers a refresh
    // useEffect(()=>{})
    
    // useEffect will only run the first time the screen loads
    useEffect(()=>{
        console.log("SCREEN HAS LOADED")
        // Move all the database fetch & state update code into the useEffect
        retrieveFromDb()

    },[])

    // helper function to get data from database & update the corresponding state variable
    const retrieveFromDb = async () => {
        // retrieve data from firestore
        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            
            // create a standard javascript array 
            // contain each document that was returned from the database
            /*
                const dataFromFs = [{
                    id:  ---> document's id from firestore ,
                    gpa: --> gpa from the firestore docuemnt,
                    name: --> name from the firestore document,
                    isPostGrad: --> true/false value from firestore document
                },
                {
                    id:  ---> document's id from firestore ,
                    gpa: --> gpa from the firestore docuemnt,
                    name: --> name from the firestore document,
                    isPostGrad: --> true/false value from firestore document

                }]
            */
            const resultsFromFirestore = []        
            querySnapshot.forEach((doc) => {              
                console.log(doc.id, " => ", doc.data());
                // make the object to add to the array
                const itemToAdd = {
                    id: doc.id, 
                    ...doc.data()
                }
                // append to array
                resultsFromFirestore.push(itemToAdd)                                                
            });

            console.log("What is in our final array")
            console.log(resultsFromFirestore)
            
            // save data to a state variable
            // when the state variable updates, the list will auto update
            setStudentsList(resultsFromFirestore)    
           // studentsList = resultsFromFirestore        

        } catch (err) {
            console.log(err)
        }
    }



    // button click handler
    const btnGetStudentsPressed = async () => {
        alert("OK!")
        // 1. get the search key from the textbox
        // 2. Build a query using that search key
        const q = query(collection(db, "students"), where("name", "==", nameFromUI));
        // const q = query(collection(db, "students"), where("gpa", ">=", 2.5));
        // 3. execute the query
        try {
            const querySnapshot = await getDocs(q);

            // 1. make temp array for this results
            let temp = []
            querySnapshot.forEach((doc) => {
                temp.push({
                    id:doc.id,
                    ...doc.data()
                })
            });
            // 2. update the state variable with the contents of the temp array
            setStudentsList(temp)
        } catch(err) {

        }
    }
    


    return(
        <View style={styles.container}>   
           <TextInput placeholder="Enter name" onChangeText={setNameFromUI} text={nameFromUI} style={styles.tb}/> 
           <Pressable style={styles.btn} onPress={btnGetStudentsPressed}>
                <Text style={styles.btnLabel}>Get from Database</Text>
           </Pressable>

           {/* // List UI goes here */}
           <FlatList
            data={studentsList}
            renderItem={
                (rowData) => {
                    return (
                        <View style={{borderBottomWidth:1}}>
                            <Text>Name: {rowData.item.name}</Text>
                            <Text>Id: {rowData.item.id}</Text>
                            <Text>GPA: {rowData.item.gpa}</Text>
                            { (rowData.item.isPostGrad === true) && 
                                <Text style={{color:"blue"}}>Post Graduate Student</Text>
                            }
                            { (rowData.item.isPostGrad === false) && 
                                <Text style={{color:"magenta"}}>Diploma Student</Text>
                            }                        
                        </View>
                    )
                }
            }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',      
      padding:20,
    },
    tb: {
        width:"100%",    
        borderRadius:5,
        backgroundColor:"#efefef",
        color:"#333",
        fontWeight:"bold",  
        paddingHorizontal:10,
        paddingVertical:15,
        marginVertical:10,        
    }, 
    btn: {
        borderWidth:1, 
        borderColor:"#141D21", 
        borderRadius:8, 
        paddingVertical:16, 
        marginVertical:20
    }, 
    btnLabel: {
        fontSize:16, 
        textAlign:"center"
    }
});

