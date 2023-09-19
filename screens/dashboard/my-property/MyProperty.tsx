import { View, Text, Button, TouchableOpacity, ScrollView, FlatList, Image, Dimensions, Modal, StyleSheet } from 'react-native';
import { useUserContext } from '../../../context/User/UserContext';
import DocumentPicker from 'react-native-document-picker';
import { useState } from 'react';
import AssmrModal from '../../../components/modal/Modal';
import { Card, TextInput } from 'react-native-paper';

const MyPropertiesScreen = () => {
    const userContext = useUserContext();
    const [openModal, setOpenModal] = useState<boolean>(false);

    const onOpenGallery = async () => {
        try{
            // const files = await DocumentPicker.pick({ type: DocumentPicker.types.images });
            // const file = files[0];
            
            // const form = new FormData();
            // form.append("images", file);
            setOpenModal(true);
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <View style={style.mypropContainer}>
            <Text>welcome to properties </Text>
            <TouchableOpacity style={style.touchOppa} onPress={ onOpenGallery }></TouchableOpacity>
            {
                openModal?
                <Modal animationType={"slide"} visible transparent>
                    <ScrollView showsVerticalScrollIndicator>
                    <View style={ style.modalContainer }>
                        <Card style={{padding: 10}}>
                            <Text style={{textAlign: "center", textTransform: "capitalize", fontSize: 20, fontWeight: "500"}}>upload your property!</Text>
                        </Card>
                        <View style={{marginTop: 10}}>
                            <Text>Firstname11</Text>
                            <TextInput />
                            <Text>Firstname</Text>
                            <TextInput />
                            <Text>Firstname</Text>
                            <TextInput />
                            <Text>Firstname</Text>
                            <TextInput />
                            <Text>Firstname</Text>
                            <TextInput />
                            <Text>Firstname</Text>
                            <TextInput />
                            <Text>Firstname</Text>
                            <TextInput />
                            <Text>Firstname22</Text>
                            <TextInput />
                            <View style={{padding: 10, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                <TouchableOpacity>
                                    <Image source={require("../../../public/images/def.png")} style={{width: 50, height: 50}} />
                                </TouchableOpacity>
                                <Text style={{paddingLeft: 10}}>uploaded image(0)</Text>
                            </View>
                            <View style={{flexDirection: "row", marginTop: 10}}>
                                <View style={{flex: 1}}>
                                    <Button title='upload' />
                                </View>
                                <Text style={{padding: 5}}></Text>
                                <View style={{flex: 1}}>
                                    <Button title='cancel' onPress={() => setOpenModal(false)} />
                                </View>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </Modal>
                :""
            }
        </View>
    )
}

const style = StyleSheet.create({
    mypropContainer: {
        height: "100%",
        backgroundColor: "#EE4D2D",
        position: "relative",
        padding: 10
    },
    touchOppa: {
        backgroundColor: "#000",
        width: 60,
        height: 60,
        borderRadius: 100,
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    modalContainer: {
        height: Dimensions.get("window").height,
        backgroundColor: "#ddd",
        padding: 10
    }
});

export default MyPropertiesScreen;