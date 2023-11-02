/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {CardContainer} from '../../../../components/card/Card';
import {TextContainer} from '../../../../components/Text/Text';
import {MyPropertyService} from '../../../../services/my-property/MyProperty';
import {BASEURL} from '../../../../utils/appUtils';
import {FlexRow} from '../../../../components/Flex-Row/styles';
import {upperCaseUserFullName} from '../../../../utils/utilsStandAlone';

export function ViewMyRealestate({route}: any) {
  const {realestateID, realestateType} = route.params;
  const mypropServ = new MyPropertyService();

  const [certainRealestate, setCertainRealestate] = useState<any>();
  useEffect(() => {
    getCertainRealestate()
      .then((response: any) => {
        const resp = response.data;
        const {data} = resp;
        // setCertainVehicle({...data});
        setCertainRealestate(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  function getCertainRealestate() {
    return mypropServ.getCertainRealestate(realestateID, realestateType);
  }
  return (
    <View style={style.rootContainer}>
      <CardContainer>
        {certainRealestate && (
          <CardContainer padding={'10px'}>
            {certainRealestate &&
              (realestateType === 'house and lot' ? (
                <Image
                  source={{
                    uri:
                      BASEURL +
                      '/' +
                      JSON.parse(certainRealestate.hal_hal_front_image)[0],
                  }}
                  style={style.imgStyle}
                />
              ) : realestateType === 'house' ? (
                <Image
                  source={{
                    uri:
                      BASEURL +
                      '/' +
                      JSON.parse(certainRealestate.house_house_front_image)[0],
                  }}
                  style={style.imgStyle}
                />
              ) : (
                <Image
                  source={{
                    uri:
                      BASEURL +
                      '/' +
                      JSON.parse(certainRealestate.lot_lot_image)[0],
                  }}
                  style={style.imgStyle}
                />
              ))}
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Type: '} />
              <TextContainer
                text={certainRealestate.realestate_realestateType}
              />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Owner: '} />
              <TextContainer
                text={upperCaseUserFullName(certainRealestate.realestate_owner)}
              />
            </FlexRow>
            {realestateType === 'house and lot' ? (
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Developer: '} />
                <TextContainer
                  text={upperCaseUserFullName(certainRealestate.hal_developer)}
                />
              </FlexRow>
            ) : realestateType === 'house' ? (
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Developer: '} />
                <TextContainer
                  text={upperCaseUserFullName(
                    certainRealestate.house_developer,
                  )}
                />
              </FlexRow>
            ) : (
              ''
            )}
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Location: '} />
              <TextContainer text={certainRealestate.realestate_location} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Downpayment: '} />
              <TextContainer text={certainRealestate.realestate_downpayment} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Installmentpaid: '} />
              <TextContainer
                text={certainRealestate.realestate_installmentpaid}
              />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Installmentduration: '} />
              <TextContainer
                text={certainRealestate.realestate_installmentduration}
              />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Delinquent: '} />
              <TextContainer text={certainRealestate.realestate_delinquent} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Description: '} />
              <TextContainer text={certainRealestate.realestate_description} />
            </FlexRow>
          </CardContainer>
        )}
      </CardContainer>
    </View>
  );
}

const style = StyleSheet.create({
  rootContainer: {
    padding: 10,
  },
  imgStyle: {
    width: '100%',
    height: 200,
  },
  flexContainerMarg: {
    paddingTop: 10,
  },
});
