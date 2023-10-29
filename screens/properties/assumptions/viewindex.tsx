/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import {CardContainer} from '../../../components/card/Card';
import {TextContainer} from '../../../components/Text/Text';
import {TouchableContainer} from '../../../components/Touchable';
import {PropertyAssumptions} from '../../../services/property-assumptions/PropertyAssumptions';
import {CertainVehicleModel} from '../../../models/property-assumption/PropertyAssumption';
import {BASEURL} from '../../../utils/appUtils';
import {FlexRowContainer} from '../../../components/Flex-Row';
import {useUserContext} from '../../../context/User/UserContext';

export const ViewVehicleInfo = ({route, navigation}: any) => {
  const userContext = useUserContext();
  const propAssumption = new PropertyAssumptions();
  const {propertyID, triggeredFrom} = route.params;
  const [certainVehicle, setCertainVehicle] = useState<CertainVehicleModel>();

  useEffect(() => {
    getCertainVehicle()
      .then(response => {
        const {data} = response;
        console.log(data);

        setCertainVehicle(data.data[0]);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function getCertainVehicle() {
    return propAssumption.getCertainVehicle(propertyID);
  }

  function onAssume() {
    if (userContext?.userId === certainVehicle?.userId) {
      Alert.alert(
        'Message',
        'Sorry, But you can not assume your own property.',
      );
      return;
    }
    navigation.navigate('AssumptionForm', {
      propertyID: certainVehicle?.vehicleImages_vehicleId,
      ownerID: certainVehicle?.userId,
    });
  }

  return (
    <View style={style.viewContainer}>
      <CardContainer padding={'10px'}>
        <CardContainer>
          {certainVehicle ? (
            <Image
              source={{
                uri:
                  BASEURL +
                  '/' +
                  JSON.parse(certainVehicle.vehicleImages_vehicleFrontIMG)[0],
              }}
              style={style.certainIMG}
              alt={'Certain Vehicle'}
            />
          ) : (
            <TextContainer text={'emp'} />
          )}
        </CardContainer>
        <TouchableNativeFeedback>
          <CardContainer padding={'10px'} margin={'5px 0 0 0'} height={'250px'}>
            <ScrollView>
              <FlexRowContainer>
                <TextContainer text={'Brand: '} />
                <TextContainer text={certainVehicle?.brand} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Model: '} />
                <TextContainer text={certainVehicle?.model} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Owner: '} />
                <TextContainer text={certainVehicle?.owner} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Downpayment: '} />
                <TextContainer text={certainVehicle?.downpayment} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Location: '} />
                <TextContainer text={certainVehicle?.location} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Installmentpaid: '} />
                <TextContainer text={certainVehicle?.installmentpaid} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Deliquent: '} />
                <TextContainer text={certainVehicle?.delinquent} />
              </FlexRowContainer>
              {triggeredFrom === 'properties-view' && (
                <TouchableContainer
                  padding={'10px'}
                  width={'100%'}
                  borderRadius={'5px'}
                  color={'#fff'}
                  margin={'10px 0 0 0'}
                  onPress={onAssume}>
                  <TextContainer
                    text={'Assume'}
                    color={'#fff'}
                    fontSize={'18px'}
                  />
                </TouchableContainer>
              )}
            </ScrollView>
          </CardContainer>
        </TouchableNativeFeedback>
      </CardContainer>
    </View>
  );
};

const style = StyleSheet.create({
  certainIMG: {
    width: 'auto',
    height: 200,
  },
  viewContainer: {
    padding: 10,
  },
});
