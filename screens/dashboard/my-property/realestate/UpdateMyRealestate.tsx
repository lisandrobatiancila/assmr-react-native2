/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import {TextContainer} from '../../../../components/Text/Text';
import {MyPropertyService} from '../../../../services/my-property/MyProperty';
import {CardContainer} from '../../../../components/card/Card';
import {TextInputContainer} from '../../../../components/TextInput/TextInput';
import {TouchableContainer} from '../../../../components/Touchable';
import {useUserContext} from '../../../../context/User/UserContext';
import Carousel from 'react-native-reanimated-carousel';
import {BASEURL} from '../../../../utils/appUtils';
import {UpdateRealestateInformationModel} from '../../../../models/my-property/MyProperty';
import { upperCaseUserFullName } from '../../../../utils/utilsStandAlone';

export function UpdateMyRealestate({route}: any) {
  const userContext = useUserContext();
  const mypropServ = new MyPropertyService();
  const {realestateID, realestateType} = route.params;
  const [certainRealestate, setCertainRealestate] = useState<any>();
  const [fullName, setFullName] = useState<string>(
    userContext?.firstname ?? '',
  );
  const [downpayment, setDownpayment] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [installmentpaid, setInstallmentpaid] = useState<string>('');
  const [installmentduration, setInstallmentduration] = useState<string>('');
  const [delinquent, setDelinquent] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [developer, setDeveloper] = useState<string>('');

  function updateCertainRealestate(realestateID: number) {
    return mypropServ.getCertainRealestate(realestateID, realestateType);
  }

  useEffect(() => {
    updateCertainRealestate(realestateID)
      .then((response: any) => {
        const {data} = response;
        console.log(data);
        setCertainRealestate(data.data);
        setDeveloper(
          realestateType === 'house and lot'
            ? data.data.hal_developer
            : data.data.house_developer,
        );
        setFullName(upperCaseUserFullName(data.data.realestate_owner));
        setDownpayment(data.data.realestate_downpayment);
        setLocation(data.data.realestate_location);
        setInstallmentpaid(data.data.realestate_installmentpaid);
        setInstallmentduration(data.data.realestate_installmentduration);
        setDelinquent(data.data.realestate_delinquent);
        setDescription(data.data.realestate_description);
      })
      .catch((err: any) => {
        console.log(err);
        Alert.alert('Something went wrong', err.message);
      });
  }, []);

  const displayCarouselImage = () => {
    const images =
      realestateType === 'house and lot'
        ? certainRealestate.hal_hal_front_image
        : realestateType === 'house'
        ? certainRealestate.house_house_front_image
        : certainRealestate.lot_lot_image;
    return (
      <Carousel
        loop
        width={400}
        height={400 / 2}
        autoPlay
        data={[...JSON.parse(images).keys()]}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View key={index}>
            <Image
              source={{
                uri: BASEURL + '/' + JSON.parse(images)[index],
              }}
              width={'100%'}
              height={200}
            />
          </View>
        )}
      />
    );
  };
  const onUpdateRealestateInformation = () => {
    const updateRealestateInfo: UpdateRealestateInformationModel = {
      id: certainRealestate.realestate_id, // vehicleID
      realestateType: realestateType,
      owner: fullName,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      description,
      developer,
    };

    mypropServ
      .updateCertainRealestateProperty(updateRealestateInfo)
      .then((response: any) => {
        const {data} = response;
        const {code, message} = data;
        if (code !== 200) {
          Alert.alert('Message', 'Something went wrong.');
          return;
        }
        Alert.alert('Message', message);
      })
      .catch((err: any) => {
        Alert.alert('Error', err.message);
      });
  };
  return (
    <ScrollView>
      <View style={style.rootContainer}>
        {certainRealestate ? (
          <CardContainer>
            <CardContainer>{displayCarouselImage()}</CardContainer>
            <CardContainer padding={'5px'} margin={'10px 0 0 0'} width={'100%'}>
              <TextInputContainer
                value={fullName}
                onChangeText={setFullName}
                placeholder={'Owner'}
                width={'100%'}
              />
              {(realestateType === 'house and lot' ||
                realestateType === 'house') && (
                <TextInputContainer
                  value={developer}
                  onChangeText={setDeveloper}
                  placeholder={'Developer'}
                  width={'100%'}
                />
              )}
              <TextInputContainer
                value={downpayment}
                onChangeText={setDownpayment}
                placeholder={'Downpayment'}
                width={'100%'}
              />
              <TextInputContainer
                value={location}
                onChangeText={setLocation}
                placeholder={'Location'}
                width={'100%'}
              />
              <TextInputContainer
                value={installmentpaid}
                onChangeText={setInstallmentpaid}
                placeholder={'Installmentpaid'}
                width={'100%'}
              />
              <TextInputContainer
                value={installmentduration}
                onChangeText={setInstallmentduration}
                placeholder={'Installmentduration'}
                width={'100%'}
              />
              <TextInputContainer
                value={delinquent}
                onChangeText={setDelinquent}
                placeholder={'Delinquent'}
                width={'100%'}
              />
              <TextInputContainer
                value={description}
                onChangeText={setDescription}
                placeholder={'Description'}
                width={'100%'}
                multiline
              />
              <TouchableContainer
                borderRadius={'3px'}
                padding={'10px'}
                margin={'10px 0 0 0'}
                onPress={onUpdateRealestateInformation}>
                <TextContainer
                  color={'#fff'}
                  text={'update'}
                  textAlign={'center'}
                  textTransform={'capitalize'}
                />
              </TouchableContainer>
            </CardContainer>
          </CardContainer>
        ) : (
          <TextContainer text={'Kindly wait for a moment...'} />
        )}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  rootContainer: {
    padding: 10,
  },
});
