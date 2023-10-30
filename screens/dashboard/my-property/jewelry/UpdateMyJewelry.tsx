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
import {UpdateJewelryInformationModel} from '../../../../models/my-property/MyProperty';

export function UpdateMyJewelry({route}: any) {
  const userContext = useUserContext();
  const mypropServ = new MyPropertyService();
  const {jewelryID} = route.params;
  const [certainJewelry, setCertainJewelry] = useState<any>();
  const [fullName, setFullName] = useState<string>(
    userContext?.firstname ?? '',
  );
  const [jewelryName, setJewelryName] = useState<string>('');
  const [jewelryModel, setJewelryModel] = useState<string>('');
  const [downpayment, setDownpayment] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [installmentpaid, setInstallmentpaid] = useState<string>('');
  const [installmentduration, setInstallmentduration] = useState<string>('');
  const [delinquent, setDelinquent] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [karat, setKarat] = useState<string>('');
  const [grams, setGrams] = useState<string>('');
  const [material, setMaterial] = useState<string>('');

  function updateCertainJewelry(jewelryID: number) {
    return mypropServ.getCertainJewelryForUpdate(jewelryID);
  }

  useEffect(() => {
    updateCertainJewelry(jewelryID)
      .then(response => {
        const {data} = response;
        console.log(data);
        setCertainJewelry(data.data);
        setJewelryName(data.data.jewelry_jewelry_name);
        setJewelryModel(data.data.jewelry_jewelry_model);
        setDownpayment(data.data.jewelry_jewelry_downpayment);
        setLocation(data.data.jewelry_jewelry_location);
        setInstallmentpaid(data.data.jewelry_jewelry_installmentpaid);
        setInstallmentduration(data.data.jewelry_jewelry_installmentduration);
        setDelinquent(data.data.jewelry_jewelry_delinquent);
        setDescription(data.data.jewelry_jewelry_description);
        setKarat(data.data.jewelry_jewelry_karat);
        setGrams(data.data.jewelry_jewelry_grams);
        setMaterial(data.data.jewelry_jewelry_material);
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
        data={[...JSON.parse(certainJewelry.jewelry_jewelry_image).keys()]}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View key={index}>
            <Image
              source={{
                uri:
                  BASEURL +
                  '/' +
                  JSON.parse(certainJewelry.jewelry_jewelry_image)[index],
              }}
              width={'100%'}
              height={200}
            />
          </View>
        )}
      />
    );
  };
  const onUpdateJewelryInformation = () => {
    const updateJewelryInfo: UpdateJewelryInformationModel = {
      id: certainJewelry.id, // vehicleID
      owner: fullName,
      jewelryName,
      jewelryModel,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      description,
      karat,
      grams,
      material,
    };

    mypropServ
      .updateCertainJewelryProperty(updateJewelryInfo)
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
        {certainJewelry && (
          <CardContainer>
            <CardContainer>{displayCarouselImage()}</CardContainer>
            <CardContainer padding={'5px'} margin={'10px 0 0 0'} width={'100%'}>
              <TextInputContainer
                value={fullName}
                onChangeText={setFullName}
                placeholder={'Owner'}
                width={'100%'}
              />
              <TextInputContainer
                value={jewelryName}
                onChangeText={setJewelryName}
                placeholder={'Brand'}
                width={'100%'}
              />
              <TextInputContainer
                value={jewelryModel}
                onChangeText={setJewelryModel}
                placeholder={'Model'}
                width={'100%'}
              />
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
              <TextInputContainer
                value={karat}
                onChangeText={setKarat}
                placeholder={'karat'}
                width={'100%'}
                multiline
              />
              <TextInputContainer
                value={grams}
                onChangeText={setGrams}
                placeholder={'grams'}
                width={'100%'}
                multiline
              />
              <TextInputContainer
                value={material}
                onChangeText={setMaterial}
                placeholder={'material'}
                width={'100%'}
                multiline
              />
              <TouchableContainer
                borderRadius={'3px'}
                padding={'10px'}
                margin={'10px 0 0 0'}
                onPress={onUpdateJewelryInformation}>
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
