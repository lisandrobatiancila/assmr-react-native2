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
import {UpdateVehicleInformationModel} from '../../../../models/my-property/MyProperty';

export function UpdateMyVehicle({route}: any) {
  const userContext = useUserContext();
  const mypropServ = new MyPropertyService();
  const {vehicleID} = route.params;
  const [certainVehicle, setCertainVehicle] = useState<any>();
  const [fullName, setFullName] = useState<string>(
    userContext?.firstname ?? '',
  );
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [downpayment, setDownpayment] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [installmentpaid, setInstallmentpaid] = useState<string>('');
  const [installmentduration, setInstallmentduration] = useState<string>('');
  const [delinquent, setDelinquent] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function updateCertainVehicle(vehicleID: number) {
    return mypropServ.getCertainVehicle(vehicleID);
  }

  useEffect(() => {
    updateCertainVehicle(vehicleID)
      .then(response => {
        const {data} = response;
        setCertainVehicle(data.data);
        setBrand(data.data.brand);
        setModel(data.data.model);
        setDownpayment(data.data.downpayment);
        setLocation(data.data.location);
        setInstallmentpaid(data.data.installmentpaid);
        setInstallmentduration(data.data.installmentduration);
        setDelinquent(data.data.delinquent);
        setDescription(data.data.description);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const displayCarouselImage = () => {
    return (
      <Carousel
        loop
        width={400}
        height={400 / 2}
        autoPlay
        data={[
          ...JSON.parse(certainVehicle.vehicleImages[0].vehicleFrontIMG).keys(),
        ]}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View key={index}>
            <Image
              source={{
                uri:
                  BASEURL +
                  '/' +
                  JSON.parse(certainVehicle.vehicleImages[0].vehicleFrontIMG)[
                    index
                  ],
              }}
              width={'100%'}
              height={200}
            />
          </View>
        )}
      />
    );
  };
  const onUpdateVehicleInformation = () => {
    const updateVehicleInfo: UpdateVehicleInformationModel = {
      id: certainVehicle.id, // vehicleID
      owner: fullName,
      brand,
      model,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      description,
    };

    mypropServ
      .updateCertainVehicleProperty(updateVehicleInfo)
      .then(response => {
        const {data} = response;
        const {code, message} = data;
        if (code !== 200) {
          Alert.alert('Message', 'Something went wrong.');
          return;
        }
        Alert.alert('Message', message);
      })
      .catch(err => {
        Alert.alert('Error', err.message);
      });
  };
  return (
    <ScrollView>
      <View style={style.rootContainer}>
        {certainVehicle && (
          <CardContainer>
            <CardContainer>{displayCarouselImage()}</CardContainer>
            <CardContainer padding={'5px'} margin={'10px 0 0 0'}>
              <TextInputContainer
                value={fullName}
                onChangeText={setFullName}
                placeholder={'Owner'}
              />
              <TextInputContainer
                value={brand}
                onChangeText={setBrand}
                placeholder={'Brand'}
              />
              <TextInputContainer
                value={model}
                onChangeText={setModel}
                placeholder={'Model'}
              />
              <TextInputContainer
                value={downpayment}
                onChangeText={setDownpayment}
                placeholder={'Downpayment'}
              />
              <TextInputContainer
                value={location}
                onChangeText={setLocation}
                placeholder={'Location'}
              />
              <TextInputContainer
                value={installmentpaid}
                onChangeText={setInstallmentpaid}
                placeholder={'Installmentpaid'}
              />
              <TextInputContainer
                value={installmentduration}
                onChangeText={setInstallmentduration}
                placeholder={'Installmentduration'}
              />
              <TextInputContainer
                value={delinquent}
                onChangeText={setDelinquent}
                placeholder={'Delinquent'}
              />
              <TextInputContainer
                value={description}
                onChangeText={setDescription}
                placeholder={'Description'}
                multiline
              />
              <TouchableContainer
                borderRadius={'3px'}
                padding={'10px'}
                margin={'10px 0 0 0'}
                onPress={onUpdateVehicleInformation}>
                <TextContainer
                  color={'#fff'}
                  text={'update'}
                  textAlign={'center'}
                  textTransform={'capitalize'}
                />
              </TouchableContainer>
            </CardContainer>
          </CardContainer>
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
