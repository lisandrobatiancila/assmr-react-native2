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
import {CertainJewelry} from '../../../models/property-assumption/PropertyAssumption';
import {BASEURL} from '../../../utils/appUtils';
import {FlexRowContainer} from '../../../components/Flex-Row';
import {useUserContext} from '../../../context/User/UserContext';
import {AssmrBadge} from '../../../components/badge/Badge';
import {WHITE_COLOR} from '../../../constants/colorConstant';
import {FlexRow} from '../../../components/Flex-Row/styles';

export const ViewJewelryInfo = ({route, navigation}: any) => {
  const userContext = useUserContext();
  const propAssumption = new PropertyAssumptions();
  const {propertyID, triggeredFrom} = route.params;
  const [certainJewelry, setCertainJewelry] = useState<CertainJewelry | null>(
    null,
  );

  useEffect(() => {
    getCertainJewelry()
      .then((response: any) => {
        const {data} = response;
        setCertainJewelry(data.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);

  function getCertainJewelry() {
    return propAssumption.getCertainJewelry(propertyID);
  }

  function onAssume() {
    if (userContext?.userId === certainJewelry?.user_id) {
      Alert.alert(
        'Message',
        'Sorry, But you can not assume your own property.',
      );
      return;
    }
    navigation.navigate('AssumptionForm', {
      propertyID: certainJewelry?.jewelry_propertyId,
      ownerID: certainJewelry?.user_id,
    });
  }

  return (
    <View style={style.viewContainer}>
      <CardContainer padding={'10px'}>
        <CardContainer>
          {certainJewelry ? (
            <Image
              source={{
                uri:
                  BASEURL +
                  '/' +
                  JSON.parse(certainJewelry.jewelry_jewelry_image)[0],
              }}
              style={style.certainIMG}
              alt={'Certain Vehicle'}
            />
          ) : (
            <TextContainer text={'emp'} />
          )}
        </CardContainer>
        <TouchableNativeFeedback>
          <CardContainer padding={'10px'} margin={'5px 0 0 0'} height={'300px'}>
            <ScrollView>
              <FlexRowContainer>
                <TextContainer text={'Name: '} />
                <TextContainer text={certainJewelry?.jewelry_jewelry_name} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Model: '} />
                <TextContainer text={certainJewelry?.jewelry_jewelry_model} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Owner: '} />
                <TextContainer text={certainJewelry?.jewelry_jewelry_owner} />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Downpayment: '} />
                <TextContainer
                  text={certainJewelry?.jewelry_jewelry_downpayment}
                />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Location: '} />
                <TextContainer
                  text={certainJewelry?.jewelry_jewelry_location}
                />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Installmentpaid: '} />
                <TextContainer
                  text={certainJewelry?.jewelry_jewelry_installmentpaid}
                />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Duration: '} />
                <TextContainer
                  text={certainJewelry?.jewelry_jewelry_installmentduration}
                />
              </FlexRowContainer>
              <FlexRowContainer>
                <TextContainer text={'Deliquent: '} />
                <TextContainer
                  text={certainJewelry?.jewelry_jewelry_description}
                />
              </FlexRowContainer>
              <AssmrBadge marginTop={5} borderRadius={100}>
                <FlexRow>
                  <TextContainer
                    color={WHITE_COLOR}
                    text={'Karat: '}
                    textAlign={'left'}
                  />
                  <TextContainer
                    color={WHITE_COLOR}
                    text={certainJewelry?.jewelry_jewelry_karat}
                    textAlign={'left'}
                  />
                </FlexRow>
              </AssmrBadge>
              <AssmrBadge marginTop={5} borderRadius={100}>
                <FlexRow>
                  <TextContainer
                    color={WHITE_COLOR}
                    text={'Grams: '}
                    textAlign={'left'}
                  />
                  <TextContainer
                    color={WHITE_COLOR}
                    text={certainJewelry?.jewelry_jewelry_grams}
                    textAlign={'left'}
                  />
                </FlexRow>
              </AssmrBadge>
              <AssmrBadge marginTop={5} borderRadius={100}>
                <FlexRow>
                  <TextContainer
                    color={WHITE_COLOR}
                    text={'Material: '}
                    textAlign={'left'}
                  />
                  <TextContainer
                    color={WHITE_COLOR}
                    text={certainJewelry?.jewelry_jewelry_material}
                    textAlign={'left'}
                  />
                </FlexRow>
              </AssmrBadge>
            </ScrollView>
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
