import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';

// import the auth variable
import { auth, db } from '../firebaseConfig';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDoc, doc } from "firebase/firestore";


import ButtonComponent from '../Components/ButtonComponent';


const LoginScreen = ({ navigation, route }) => {

    const [usernameFromUI, setUsernameFromUI] = useState("amy@gmail.com");
    const [passwordFromUI, setPasswordFromUI] = useState("123456");

    const checkUserRole = async (email) => {
        try{
            const docRef = doc(db, "User", email);

            const docSnapshot = await getDoc(docRef);

            if (docSnapshot.exists()){

                console.log(`Document data : ${JSON.stringify(docSnapshot.data())}`);

                const userData = docSnapshot.data();
                console.log(userData.role);
                
                if (userData.role !== "owner"){
                    alert(`Only car owner can access this app!`)
                    return
                }

                navigation.replace('Home', {
                    screen: 'Rental Form',
                    params: { email: usernameFromUI },
                });

            }else{
                //no matching document for the given ID found
                console.log(`no matching document for the given ID ${email} found`);
                alert(`Sorry, you are not a registered user.`)
            }

        }catch(err){
            console.error(`Error getting existing document with id ${email}: ${err}`);
        }
    }

    const onLoginClicked = async () => {
        //verify credentials
        try {
            const userCredential = await signInWithEmailAndPassword(auth, usernameFromUI, passwordFromUI)
            // who is the current user?
            console.log("Who is the currently logged in user")
            console.log(auth.currentUser.email)

            checkUserRole(auth.currentUser.email)

            

        } catch (err) {
            console.log(err)
            alert(`Sorry, the login info is incorrect.`)
        }
    }

    return (

        <View style={styles.container}>
            <Text style={styles.headerText}>
                Login Screen</Text>

            <TextInput
                style={styles.tb}
                placeholder="Enter your email"
                textContentType="emailAddress"
                autoCapitalize="none"
                value={usernameFromUI}
                onChangeText={setUsernameFromUI}
            />
            <TextInput
                style={styles.tb}
                placeholder="Enter your password"
                secureTextEntry={true}
                autoCapitalize="none"
                value={passwordFromUI}
                onChangeText={setPasswordFromUI}
            />

            <ButtonComponent
                onPress={onLoginClicked}
                text={"Login"}
                justifyContent={"center"}
                bgColor={"#0064B1"}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    btn: {
        borderWidth: 1,
        borderColor: "#141D21",
        borderRadius: 8,
        paddingVertical: 16,
        marginVertical: 10
    },
    btnLabel: {
        fontSize: 16,
        textAlign: "center"
    },
    tb: {
        width: "100%",
        borderRadius: 5,
        backgroundColor: "#efefef",
        color: "#333",
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginVertical: 10,
    },
    formLabel: {
        fontSize: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    }
});

export default LoginScreen;