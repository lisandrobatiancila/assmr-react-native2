import { View, Text, StyleSheet, Alert, useColorScheme } from 'react-native';
import { Card } from 'react-native-paper'
import { TextInput, Button, TouchableOpacity } from 'react-native';
import { useContext, useId, useState } from 'react';
import { UserSinginModel } from '../../models/user/UserModel';
import SigninService from '../../services/credentials/SigninService';
import { useUserContext } from '../../context/User/UserContext';

type SinginProps = {
    navigation: any
};

const SigninScreen = ({ navigation }: SinginProps) => {
    const signinService = new SigninService();
    const userContext = useUserContext();
    
    const [signinEmail, setSigninEmail] = useState<string>('');
    const [signinPassword, setSigninPassword] = useState<string>('');

    const onSignin = () => {
        const userForm: UserSinginModel = {
            email: signinEmail,
            password: signinPassword
        }
        signinService.signinUser(userForm)
            .then((response) => {
                const { code, status, message } = response.data;
                
                if(status === 200) {
                    const { userId, email, firstname, middlename, lastname, address } = response.data.data;
                    
                    userContext?.setUserId(userId);
                    userContext?.setEmail(email);
                    userContext?.setFirstname(firstname);
                    userContext?.setMiddlename(middlename);
                    userContext?.setLastname(lastname);
                    userContext?.setAddress(address);
                    navigation.navigate("Dashboard");
                }
                else
                    Alert.alert("Message", message);
            })
            .catch((err) => {
                Alert.alert("Message", err.message);
            })
    } // submit to API

    return(
        <View style={ style.signinContainer }>
            <Card style={style.cardContainer}>
                <View>
                    <View>
                        <Text style = {[style.textCapitalize, {fontSize: 18, fontWeight: "600"}]}>username </Text>
                        <TextInput value={ signinEmail } onChangeText={ setSigninEmail } keyboardType={"email-address"} style = {{ borderBottomWidth: 1 }} />
                        <Text style = {[style.textCapitalize, {fontSize: 18, fontWeight: "600"}]}>password</Text>
                        <TextInput value={ signinPassword } onChangeText={ setSigninPassword } style = {{ borderBottomWidth: 1 }} secureTextEntry placeholder='******' />
                    </View>
                    <View>
                        <View style = {{ marginTop: 10 }}>
                            <TouchableOpacity style = { style.touchableStyle } onPress={ onSignin }>
                                <Text style = {[{ textAlign: "center", fontSize: 20, fontWeight: "600", letterSpacing: 1.5, color: "#fff" }, style.textCapitalize]}>login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const style = StyleSheet.create({
    signinContainer: {
        backgroundColor: "#EE4D2D",
        height: "100%",
        padding: 10,
        justifyContent: "center"
    },
    cardContainer: {
        padding: 10
    },
    touchableStyle: {
        backgroundColor: "#f55442",
        padding: 10,
        borderRadius: 100
    },
    textCapitalize: {
        textTransform: "capitalize"
    }
});

export default SigninScreen;