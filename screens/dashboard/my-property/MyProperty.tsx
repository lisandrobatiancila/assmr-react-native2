import { View, Text, Image, Button, TouchableOpacity, ScrollView, FlatList, Dimensions, Modal, StyleSheet } from 'react-native';
import { useUserContext } from '../../../context/User/UserContext';
import { useState } from 'react';
import { Card, TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import MyVehicleProperty from './vehicle/MyVehicleProperty';
import VehicleProperty from '../../../components/upload-property/VehicleProperty';

const MyPropertiesScreen = () => {
    const userContext = useUserContext();
    const [openModal, setOpenModal] = useState<boolean>(false);

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

    const closeModal = () => {
        setOpenModal(false);
    }

    return (
        <View style={style.mypropContainer}>
            <Text>welcome to properties </Text>
            <MyVehicleProperty />
            <TouchableOpacity style={style.touchOppa} onPress={ onOpenGallery }>
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
                                        <VehicleProperty email ={userContext?.email} closeModal = { closeModal } />
                                        :""
                                        :
                                        <VehicleProperty email ={userContext?.email} closeModal = { closeModal } />
                                    }
                                </View>
                            </View>
                            }
                        /> 
                        {/* end of Flatlist */}
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
        backgroundColor: "#fff",
        width: 60,
        height: 60,
        borderRadius: 100,
        position: "absolute",
        bottom: 5,
        right: 5,
    },
    modalContainer: {
        height: Dimensions.get("window").height+400, // just a working fix right now
        backgroundColor: "#ddd",
        padding: 10,
    }
});

export default MyPropertiesScreen;