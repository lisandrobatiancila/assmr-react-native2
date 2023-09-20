import { View, Text, Button, TouchableOpacity, ScrollView, FlatList, Image, Dimensions, Modal, StyleSheet } from 'react-native';
import { useUserContext } from '../../../context/User/UserContext';
import { useState } from 'react';
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
    const [onOpenPropToUpload, setOnOpenPropToUpload] = useState<boolean>(false);
    const [propToUploadValue, setPropToUploadValue] = useState(null);
    const [propToUploadItems, setPropToUploadItems] = useState<{label: string, value: string}[]>([
        {
            label: "Vehicle",
            value: "Vehicle"
        },
        {
            label: "Jewelry",
            value: "Jewelry"
        },
        {
            label: "Realestate",
            value: "Realestate"
        }
    ]);
    
    const onUploadProperty = (propertyType: string) => {

    }

    const closeModal = () => {
        setOpenModal(false);
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
            <TouchableOpacity style={style.touchOppa} onPress={ () => setOpenModal(true) }>
                <Image source={require("../../../public/images/add.png")} />
            </TouchableOpacity>
            {
                openModal?
                <Modal animationType={"slide"} visible transparent>
                    <FlatList
                        data={[1]}
                        renderItem={({ item }) =>
                        <View style={ style.modalContainer }>
                            <Card style={{padding: 10}}>
                                <Text style={{textAlign: "center", textTransform: "capitalize", fontSize: 20, fontWeight: "500"}}>upload your property!</Text>
                            </Card>
                            <View style={{marginTop: 10}}>
                                <DropDownPicker
                                    open = { onOpenPropToUpload }
                                    value = { propToUploadValue }
                                    items={ propToUploadItems }
                                    setOpen={ setOnOpenPropToUpload }
                                    setValue={ setPropToUploadValue }
                                    setItems={ setPropToUploadItems }
                                    placeholder='Select a property'
                                    style = {{ marginTop: 5 }}
                                />
                                {
                                    propToUploadValue?
                                    propToUploadValue == "Vehicle"?
                                    <VehicleProperty closeModal = { closeModal } />
                                    :""
                                    :
                                    <VehicleProperty closeModal = { closeModal } />
                                }
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