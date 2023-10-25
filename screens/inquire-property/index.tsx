import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {CardContainer} from '../../components/card/Card';
import {TextInputContainer} from '../../components/TextInput/TextInput';
import {FlexCol} from '../../components/Flex-Col';
import {TextContainer} from '../../components/Text/Text';
import {WHITE_COLOR} from '../../constants/colorConstant';
import {useUserContext} from '../../context/User/UserContext';
import {TouchableContainer} from '../../components/Touchable';
import {capitalizeString} from '../../utils/utilsStandAlone';
import {InquiriesModel} from '../../models/inquiries/InquiriesModel';
import {InquiriesService} from '../../services/inquiries/Inquiries';
import {APP_SUCCESS_CODE} from '../../constants/appConstants';

export const InquireProperties = (props: any) => {
  const {userReceiverId, propertyId} = props.route.params;
  const inquiriesService = new InquiriesService();
  const userContext = useUserContext();

  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [streetAddress, setStreetAddress] = useState<string>('');
  const [addressLine2, setAddressLine2] = useState<string>('');
  const [stateProvince, setStateProvince] = useState<string>('');
  const [postalZipCode, setPostalZipCode] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [inquiryDescription, setInquiryDescription] = useState<string>('');

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
  const onSubmitInquiries = async () => {
    const payload: InquiriesModel = {
      userSenderId: userContext?.userId ?? 0,
      userReceiverId: userReceiverId,
      propertyId,
      firstname,
      lastname,
      address,
      streetAddress,
      addressLine2,
      stateProvince,
      postalZipCode,
      phoneNumber,
      email,
      inquiryDescription,
    };

    const resp = await inquiriesService.sendInquiries(payload);
    const {data} = resp;
    const {code} = data;
    if (code === APP_SUCCESS_CODE) {
      Alert.alert('Message', data.data);
      resetFormFields();
    }
  };
  function resetFormFields() {
    setStreetAddress('');
    setAddressLine2('');
    setStateProvince('');
    setPostalZipCode('');
    setInquiryDescription('');
  }

  return (
    <ScrollView>
      <View style={{padding: 10}}>
        <CardContainer padding={'10px'} height={'auto'}>
          <FlexCol>
            <TextContainer
              text={'Firstname'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              disabled={true}
              width={'100%'}
              value={capitalizeString(firstname)}
              onChangeText={(e: any) => onChangeText(setFirstname, e)}
            />
            <TextContainer
              text={'Lastname'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              disabled={true}
              width={'100%'}
              value={capitalizeString(lastname)}
              onChangeText={(e: any) => onChangeText(setLastname, e)}
            />
            <TextContainer
              text={'Address'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              width={'100%'}
              value={address}
              onChangeText={(e: any) => onChangeText(setAddress, e)}
            />
            <TextContainer
              text={'Street Address'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              width={'100%'}
              value={streetAddress}
              onChangeText={(e: any) => onChangeText(setStreetAddress, e)}
            />
            <TextContainer
              text={'Street Address Line2'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              width={'100%'}
              value={addressLine2}
              onChangeText={(e: any) => onChangeText(setAddressLine2, e)}
            />
            <TextContainer
              text={'State / Province'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              width={'100%'}
              value={stateProvince}
              onChangeText={(e: any) => onChangeText(setStateProvince, e)}
            />
            <TextContainer
              text={'Postal / Zip Code'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              width={'100%'}
              value={postalZipCode}
              onChangeText={(e: any) => onChangeText(setPostalZipCode, e)}
            />
            <TextContainer
              text={'Phonenumber'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInputContainer
              width={'100%'}
              value={phoneNumber}
              onChangeText={(e: any) => onChangeText(setAddress, e)}
            />
            <TextContainer text={'Email'} textAlign={'left'} margin={'5px 0'} />
            <TextInputContainer
              width={'100%'}
              value={email}
              onChangeText={(e: any) => onChangeText(setEmail, e)}
            />
            <TextContainer
              text={'Include a small description here.'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInput
              value={inquiryDescription}
              onChangeText={setInquiryDescription}
              style={style.inputStyle}
              multiline
            />
          </FlexCol>
          <TouchableContainer
            padding={'10px'}
            borderRadius={'10px'}
            margin={'10px 0'}
            onPress={onSubmitInquiries}>
            <TextContainer
              color={WHITE_COLOR}
              fontSize={'18px'}
              text={'send inquiries'}
              textTransform={'capitalize'}
            />
          </TouchableContainer>
        </CardContainer>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  inputStyle: {
    backgroundColor: WHITE_COLOR,
    height: 200,
    textAlignVertical: 'top',
    textAlign: 'auto',
  },
});
