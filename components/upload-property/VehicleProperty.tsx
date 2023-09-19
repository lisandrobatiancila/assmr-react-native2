import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

type VehiclePropertyProps = {
    onUploadProperty: (propertyType: string) => void
};

const VehicleProperty = ({ onUploadProperty }: VehiclePropertyProps) => {
    const [brand, setBrand] = useState<string>('');
    const [model, setModel] = useState<string>('');
    const [owner, setOwner] = useState<string>('');
    const [downpayment, setDownpayment] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [installmentpaid, setInstallmentpaid] = useState<string>('');
    const [installmentduration, setInstallmentduration] = useState<string>('');
    const [delinquent, setDelinquent] = useState<string>('');

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