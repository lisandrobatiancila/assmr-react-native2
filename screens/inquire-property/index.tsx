import React, {useEffect, useState} from 'react';
import {ScrollView, TextInput, View} from 'react-native';
import { CardContainer } from '../../components/card/Card';
import { FlexRow } from '../../components/Flex-Row/styles';
import { TextInputContainer } from '../../components/TextInput/TextInput';
import { FlexCol } from '../../components/Flex-Col';
import { TextContainer } from '../../components/Text/Text';
import { WHITE_COLOR } from '../../constants/colorConstant';
import { useUserContext } from '../../context/User/UserContext';

export const InquireProperties = () => {
    const userContext = useUserContext();
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addressLine2, setAddressLine2] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [stateProvince, setStateProvince] = useState<string>('');
    const [postalZipCode, setPostalZipCode] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    function onChangeText(cb: (param: string) => void, e: any) {
        cb(e);
    }
    useEffect(() => {
        setFirstname(userContext?.firstname ?? '');
        setLastname(userContext?.lastname ?? '');
        setEmail(userContext?.email ?? '');
        setPhoneNumber(userContext?.contactno ?? '');
        setAddress(userContext?.address ?? '');
    }, []);

    return (
        <ScrollView>
            <View style={{padding: 10}}>
                <CardContainer padding={'10px'} height={'auto'}>
                    <FlexCol>
                        <TextContainer text={'Firstname'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer disabled={true} width={'100%'} value={firstname} onChangeText={(e: any) => onChangeText(setFirstname, e)} />
                        <TextContainer text={'Lastname'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer disabled={true} width={'100%'} value={lastname} onChangeText={(e: any) => onChangeText(setLastname, e)} />
                        <TextContainer text={'Address'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer width={'100%'} value={address} onChangeText={(e: any) => onChangeText(setAddress, e)} />
                        <TextContainer text={'Street Address'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer width={'100%'} value={addressLine2} onChangeText={(e: any) => onChangeText(setAddress, e)} />
                        <TextContainer text={'Street Address Line2'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer width={'100%'} value={city} onChangeText={(e: any) => onChangeText(setAddress, e)} />
                        <TextContainer text={'State / Province'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer width={'100%'} value={city} onChangeText={(e: any) => onChangeText(setAddress, e)} />
                        <TextContainer text={'Postal / Zip Code'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer width={'100%'} value={city} onChangeText={(e: any) => onChangeText(setAddress, e)} />
                        <TextContainer text={'Phonenumber'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer width={'100%'} value={phoneNumber} onChangeText={(e: any) => onChangeText(setAddress, e)} />
                        <TextContainer text={'Email'} textAlign={'left'} margin={'5px 0'} />
                        <TextInputContainer width={'100%'} value={email} onChangeText={(e: any) => onChangeText(setAddress, e)} />
                        <TextContainer text={'Include a small description here.'} textAlign={'left'} margin={'5px 0'} />
                        <TextInput style={{backgroundColor: WHITE_COLOR, height: 200, textAlignVertical: 'top', textAlign: 'auto'}} multiline />
                    </FlexCol>
                </CardContainer>
            </View>
        </ScrollView>
    )
};