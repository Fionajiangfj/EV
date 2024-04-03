import React from "react"
import { StyleSheet, Text, View, Pressable, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react"

// 1. Import the db variable from firebaseConfig
import { db } from '../firebaseConfig';

// 2. Import the relevant functions from firestore
import { collection, getDocs, query, where } from "firebase/firestore";
import FlatListComponent from "../Components/FlatListComponent";
import ButtonComponent from "../Components/ButtonComponent";


// export default function MyRentalListScreen() {

//     // state variable for the text box
//     const [nameFromUI, setNameFromUI] = useState("")

//     // state variable to store the data that should be display in the list
//     const [studentsList, setStudentsList] = useState([])

//     // useEffect() run every time the screen triggers a refresh
//     // useEffect(()=>{})

//     // useEffect will only run the first time the screen loads
//     useEffect(()=>{
//         console.log("SCREEN HAS LOADED")
//         // Move all the database fetch & state update code into the useEffect
//         retrieveFromDb()

//     },[])

//     // helper function to get data from database & update the corresponding state variable
//     const retrieveFromDb = async () => {
//         // retrieve data from firestore
//         try {
//             const querySnapshot = await getDocs(collection(db, "students"));

//             // create a standard javascript array 
//             // contain each document that was returned from the database
//             /*
//                 const dataFromFs = [{
//                     id:  ---> document's id from firestore ,
//                     gpa: --> gpa from the firestore docuemnt,
//                     name: --> name from the firestore document,
//                     isPostGrad: --> true/false value from firestore document
//                 },
//                 {
//                     id:  ---> document's id from firestore ,
//                     gpa: --> gpa from the firestore docuemnt,
//                     name: --> name from the firestore document,
//                     isPostGrad: --> true/false value from firestore document

//                 }]
//             */
//             const resultsFromFirestore = []        
//             querySnapshot.forEach((doc) => {              
//                 console.log(doc.id, " => ", doc.data());
//                 // make the object to add to the array
//                 const itemToAdd = {
//                     id: doc.id, 
//                     ...doc.data()
//                 }
//                 // append to array
//                 resultsFromFirestore.push(itemToAdd)                                                
//             });

//             console.log("What is in our final array")
//             console.log(resultsFromFirestore)

//             // save data to a state variable
//             // when the state variable updates, the list will auto update
//             setStudentsList(resultsFromFirestore)    
//            // studentsList = resultsFromFirestore        

//         } catch (err) {
//             console.log(err)
//         }
//     }



//     // button click handler
//     const btnGetStudentsPressed = async () => {
//         alert("OK!")
//         // 1. get the search key from the textbox
//         // 2. Build a query using that search key
//         const q = query(collection(db, "students"), where("name", "==", nameFromUI));
//         // const q = query(collection(db, "students"), where("gpa", ">=", 2.5));
//         // 3. execute the query
//         try {
//             const querySnapshot = await getDocs(q);

//             // 1. make temp array for this results
//             let temp = []
//             querySnapshot.forEach((doc) => {
//                 temp.push({
//                     id:doc.id,
//                     ...doc.data()
//                 })
//             });
//             // 2. update the state variable with the contents of the temp array
//             setStudentsList(temp)
//         } catch(err) {

//         }
//     }
                         


//     return(
//         <View style={styles.container}>   
//            <TextInput placeholder="Enter name" onChangeText={setNameFromUI} text={nameFromUI} style={styles.tb}/> 
//            <Pressable style={styles.btn} onPress={btnGetStudentsPressed}>
//                 <Text style={styles.btnLabel}>Get from Database</Text>
//            </Pressable>

//            {/* // List UI goes here */}
//            <FlatList
//             data={studentsList}
//             renderItem={
//                 (rowData) => {
//                     return (
//                         <View style={{borderBottomWidth:1}}>
//                             <Text>Name: {rowData.item.name}</Text>
//                             <Text>Id: {rowData.item.id}</Text>
//                             <Text>GPA: {rowData.item.gpa}</Text>
//                             { (rowData.item.isPostGrad === true) && 
//                                 <Text style={{color:"blue"}}>Post Graduate Student</Text>
//                             }
//                             { (rowData.item.isPostGrad === false) && 
//                                 <Text style={{color:"magenta"}}>Diploma Student</Text>
//                             }                        
//                         </View>
//                     )
//                 }
//             }/>
//         </View>
//     )
// }

const MyRentalListScreen = ({ navigation }) => {
    // data source for the list. Objects must contain an id or key property.
    const friendsList = [{ id: 33, name: "Marie" }, { id: 50, name: "Sasha" }, { id: 100, name: "Cornelius" }];

    // state variable
    const [myRentals, setMyRentals] = useState([])

    useEffect(() => {
        console.log("My Rental List screen loaded")

        // Move all the database fetch & state update code into the useEffect
        // retrieveRentalsFromDB()
    }, [])

    // func to retrieve favourite videos from the db
    // const retrieveRentalsFromDB = async () => {

    //     try {
    //         // request data from favourite_videos collection
    //         const querySnapshot = await getDocs(collection(db, "my_rentals"));

    //         const resultsFromFirestore = []

    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.id, " => ", doc.data());
    //             // make the object to add to the array
    //             const itemToAdd = {
    //                 id: doc.id,
    //                 ...doc.data()
    //             }
    //             // append to array
    //             resultsFromFirestore.push(itemToAdd)
    //         });

    //         console.log("array data...")
    //         console.log(resultsFromFirestore)

    //         // save data to a state variable
    //         // when the state variable updates, the list will auto update
    //         setMyRentals(resultsFromFirestore)
    //     }
    //     catch (err) {
    //         console.log(err.message)
    //     }

    // }

    // Function to navigate to details screen
    // const goToDetailsScreen = (id) => {
    //     navigation.push("Rental Details", { id }); // Pass any necessary data to details screen
    // }
    const goToDetailsScreen = () => {
        // navigation.push("Rental Details"); // Pass any necessary data to details screen
        navigation.navigate('RentalDetails')
    }

    const ItemDivider = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#888" }} />
        )
    }

    // render the list
    return (
        <View style={styles.rentalContainer}>

            <Text style={styles.header}>My Rental Listings</Text>

            {/* Customized button to view favourites */}
            <ButtonComponent
                onPress={() => deleteAllRentalListings("my_rentals")}
                text={"Delete All"}
                justifyContent={"flex-end"}
                bgColor={"#FF0000"}
                disabled={myRentals.length === 0}
            />

            {/* Conditionally render message when there are no favorites */}
            {/* {myRentals.length === 0 ? (
                <Text style={styles.noData}>No Data found</Text>
            ) : ( */}

                {/* // Customized FlatList */}
                <FlatListComponent
                    data={friendsList}
                    renderItem={({ item }) => (
                        <Pressable style={styles.listItem} onPress={() => goToDetailsScreen()}>
                            <Text style={styles.listTitle}>{item.name}</Text>
                        </Pressable>
                    )}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={ItemDivider}
                />
            {/* )} */}


        </View>
    );

}

export default MyRentalListScreen;

const styles = StyleSheet.create({
    rentalContainer: {
        //   flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    noData: {
        textAlign: 'center',
        paddingTop: 100,
        fontSize: 18,
        color: 'gray',
        height: '100%',
    },

    // list item design
    listItem: {
        flexDirection: 'column',
        alignItems: 'left',
        padding: 10,
    },

    listTitle: {
        fontSize: 15,
        textAlign: 'left',
        paddingVertical: 10,
        color: 'black',
        fontWeight: 'bold',
    },



});

