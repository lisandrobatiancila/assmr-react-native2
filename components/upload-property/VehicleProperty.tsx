<<<<<<< HEAD
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button, Image } from 'react-native';
import { useState } from 'react';
import { ImageModel } from '../../models/image/Image';
import DocumentPicker from 'react-native-document-picker';

type VehiclePropertyProps = {
    closeModal: () => void
};

const VehicleProperty = ({ closeModal }: VehiclePropertyProps) => {
=======
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

type VehiclePropertyProps = {
    onUploadProperty: (propertyType: string) => void
};

const VehicleProperty = ({ onUploadProperty }: VehiclePropertyProps) => {
>>>>>>> main
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [downpayment, setDownpayment] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [installmentpaid, setInstallmentpaid] = useState<string>('');
    const [installmentduration, setInstallmentduration] = useState<string>('');
    const [delinquent, setDelinquent] = useState<string>('');

<<<<<<< HEAD
    const [fileInfo, setFileInfo] = useState<ImageModel | null>(null)

    const onOpenGallery = async () => {
        try{
            const files = await DocumentPicker.pick({ type: DocumentPicker.types.images });
            const file: any = files[0];
            console.log(file);
            
            const form = new FormData();
            form.append("images", file);

            setFileInfo(file)
        }
        catch(err) {
            console.log(err);
        }
    }
=======
>>>>>>> main
    return (
        <View>
            <Text style = { style.textLabel }>brand</Text>
            <TextInput value={ brand } onChangeText={ setBrand } style={ style.textInput } />
            <Text style = { style.textLabel }>model</Text>
            <TextInput value={ model } onChangeText={ setModel } style={ style.textInput } />
            <Text style = { style.textLabel }>owner</Text>
            <TextInput value={ owner } onChangeText={ setOwner } style={ style.textInput } />
            <Text style = { style.textLabel }>downpayment</Text>
            <TextInput value= { downpayment } onChangeText={ setDownpayment } style={ style.textInput } />
            <Text style = { style.textLabel }>location</Text>
            <TextInput value={ location } onChangeText={ setLocation } style={ style.textInput } />
            <Text style = { style.textLabel }>installmentpaid</Text>
            <TextInput value={ installmentpaid } onChangeText={ setInstallmentpaid } style={ style.textInput } />
            <Text style = { style.textLabel }>installmentduration</Text>
            <TextInput value={ installmentduration } onChangeText={ setInstallmentduration } style={ style.textInput } />
            <Text style = { style.textLabel }>delinquent</Text>
            <TextInput value={ delinquent } onChangeText={ setDelinquent } style={ style.textInput } />
<<<<<<< HEAD
            <View style={{padding: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: fileInfo?"green":"#000", borderWidth: 2, marginTop: 10}}>
                <TouchableOpacity onPress={ onOpenGallery }>
                    <Image source={require("../../public/images/def.png")} style={{width: 50, height: 50}} />
                </TouchableOpacity>
                <Text style={{paddingLeft: 10, fontWeight: "500", textTransform: "capitalize", fontSize: 18}}>uploaded image(0)</Text>
            </View>
            <View style={{flexDirection: "row", marginTop: 10}}>
                <View style={{flex: 1}}>
                    <Button title='upload' />
                </View>
                <Text style={{padding: 5}}></Text>
                <View style={{flex: 1}}>
                    <Button title='cancel' onPress={() =>{
                        setFileInfo(null)
                        closeModal();
                    }} />
                </View>
            </View>
=======
>>>>>>> main
        </View>
    )
}

const style = StyleSheet.create({
    textInput: {
        backgroundColor: "#fff",
        borderRadius: 5
    },
    textLabel: {
        textTransform: "capitalize",
        paddingTop: 5,
        paddingBottom: 5
    }
})

export default VehicleProperty;