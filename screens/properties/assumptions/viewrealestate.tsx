/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Alert,
  ToastAndroid,
} from 'react-native';
import {CardContainer} from '../../../components/card/Card';
import {TextContainer} from '../../../components/Text/Text';
import {TouchableContainer} from '../../../components/Touchable';
import {PropertyAssumptions} from '../../../services/property-assumptions/PropertyAssumptions';
import {CertainRealestate} from '../../../models/property-assumption/PropertyAssumption';
import {BASEURL} from '../../../utils/appUtils';
import {FlexRowContainer} from '../../../components/Flex-Row';
import {useUserContext} from '../../../context/User/UserContext';
import {upperCaseUserFullName} from '../../../utils/utilsStandAlone';

export const ViewRealestateInfo = ({route, navigation}: any) => {
  const userContext = useUserContext();
  const propAssumption = new PropertyAssumptions();
  const {propertyID, realestateType, triggeredFrom} = route.params;
  const [certainRealestate, setCertainRealestate] =
    useState<CertainRealestate | null>(null);

  useEffect(() => {
    getCertainRealestate()
      .then(response => {
        const {data} = response;
        setCertainRealestate(data.data);
      })
      .catch(err => {
        console.log(err);
        ToastAndroid.show(err.message, ToastAndroid.LONG);
      });
  }, []);

  function getCertainRealestate() {
    return propAssumption.getCertainRealestate(propertyID, realestateType);
  }

  function onAssume() {
    if (userContext?.userId === certainRealestate?.realestate_userId) {
      Alert.alert(
        'Message',
        'Sorry, But you can not assume your own property.',
      );
      return;
    }
    navigation.navigate('AssumptionForm', {
      propertyID: certainRealestate?.realestate_id,
      ownerID: certainRealestate?.realestate_userId,
    });
  }

  return (
    <View style={style.viewContainer}>
      <CardContainer padding={'10px'}>
        <CardContainer>
          {certainRealestate?.realestate_realestateType &&
            (certainRealestate.realestate_realestateType === 'house and lot' ? (
              <Image
                source={{
                  uri:
                    BASEURL +
                    '/' +
                    JSON.parse(certainRealestate.hal_hal_front_image)[0],
                }}
                style={style.certainIMG}
                alt={'Certain Realestate'}
              />
            ) : certainRealestate.realestate_realestateType === 'house' ? (
              <Image
                source={{
                  uri:
                    BASEURL +
                    '/' +
                    JSON.parse(certainRealestate.house_house_front_image)[0],
                }}
                style={style.certainIMG}
                alt={'Certain Realestate'}
              />
            ) : (
              <Image
                source={{
                  uri:
                    BASEURL +
                    '/' +
                    JSON.parse(certainRealestate.lot_lot_image)[0],
                }}
                style={style.certainIMG}
                alt={'Certain Realestate'}
              />
            ))}
        </CardContainer>
        <TouchableNativeFeedback>
          <CardContainer padding={'10px'} margin={'5px 0 0 0'} height={'250px'}>
            <ScrollView>
              <FlexRowContainer>
                <TextContainer text={'Realestatetype: '} />
                <TextContainer
                  text={upperCaseUserFullName(
                    certainRealestate?.realestate_realestateType ?? '',
                  )}
                />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Owner: '} />
                <TextContainer text={certainRealestate?.realestate_owner} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Downpayment: '} />
                <TextContainer
                  text={certainRealestate?.realestate_downpayment}
                />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Location: '} />
                <TextContainer text={certainRealestate?.realestate_location} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Installmentpaid: '} />
                <TextContainer
                  text={certainRealestate?.realestate_installmentpaid}
                />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Deliquent: '} />
                <TextContainer
                  text={certainRealestate?.realestate_installmentduration}
                />
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
