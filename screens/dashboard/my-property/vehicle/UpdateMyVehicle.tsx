/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {TextContainer} from '../../../../components/Text/Text';
import {MyPropertyService} from '../../../../services/my-property/MyProperty';
import {CardContainer} from '../../../../components/card/Card';
import {TextInputContainer} from '../../../../components/TextInput/TextInput';
import {TouchableContainer} from '../../../../components/Touchable';
import {useUserContext} from '../../../../context/User/UserContext';
import {upperCaseUserFullName} from '../../../../utils/utilsStandAlone';
import Carousel from 'react-native-reanimated-carousel';
import {BASEURL} from '../../../../utils/appUtils';

export function UpdateMyVehicle({route}: any) {
  const userContext = useUserContext();
  const mypropServ = new MyPropertyService();
  const {vehicleID} = route.params;
  const [certainVehicle, setCertainVehicle] = useState<any>();
  const [fullName, setFullName] = useState<string>(
    userContext?.firstname ?? '',
  );

  function updateCertainVehicle(vehicleID: number) {
    return mypropServ.getCertainVehicle(vehicleID);
  }

  useEffect(() => {
    updateCertainVehicle(vehicleID)
      .then(response => {
        const {data} = response;
        setCertainVehicle(data.data);
        console.log(certainVehicle);
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
    
  }
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
                value={certainVehicle.brand}
                placeholder={'Brand'}
              />
              <TextInputContainer
                value={certainVehicle.model}
                placeholder={'Model'}
              />
              <TextInputContainer
                value={certainVehicle.downpayment}
                placeholder={'Downpayment'}
              />
              <TextInputContainer
                value={certainVehicle.location}
                placeholder={'Location'}
              />
              <TextInputContainer
                value={certainVehicle.installmentpaid}
                placeholder={'Installmentpaid'}
              />
              <TextInputContainer
                value={certainVehicle.installmentduration}
                placeholder={'Installmentduration'}
              />
              <TextInputContainer
                value={certainVehicle.delinquent}
                placeholder={'Delinquent'}
              />
              <TextInputContainer
                value={certainVehicle.description}
                placeholder={'Description'}
                multiline
              />
              <TouchableContainer
                borderRadius={'3px'}
                padding={'10px'}
                margin={'10px 0 0 0'}
                onPress={onUpdateVehicleInformation}
                >
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
