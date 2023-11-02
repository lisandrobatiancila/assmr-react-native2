/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {CardContainer} from '../../../../components/card/Card';
import {TextContainer} from '../../../../components/Text/Text';
import {MyPropertyService} from '../../../../services/my-property/MyProperty';
import {BASEURL} from '../../../../utils/appUtils';
import {FlexRow} from '../../../../components/Flex-Row/styles';
import {upperCaseUserFullName} from '../../../../utils/utilsStandAlone';

export function ViewMyVehicle({route}: any) {
  const {vehicleID} = route.params;
  const mypropServ = new MyPropertyService();

  const [certainVehicle, setCertainVehicle] = useState<any>();
  useEffect(() => {
    getCertainVehicle()
      .then(response => {
        const resp = response.data;
        const {data} = resp;
        // setCertainVehicle({...data});
        setCertainVehicle(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  function getCertainVehicle() {
    console.log(vehicleID);

    return mypropServ.getCertainVehicle(vehicleID);
  }
  return (
    <View style={style.rootContainer}>
      <CardContainer>
        {certainVehicle && (
          <CardContainer padding={'10px'}>
            {certainVehicle && (
              <Image
                source={{
                  uri:
                    BASEURL +
                    '/' +
                    JSON.parse(
                      certainVehicle.vehicleImages[0].vehicleFrontIMG,
                    )[0],
                }}
                style={style.imgStyle}
              />
            )}
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Owner: '} />
              <TextContainer
                text={upperCaseUserFullName(certainVehicle.owner)}
              />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Brand: '} />
              <TextContainer text={certainVehicle.brand} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Model: '} />
              <TextContainer text={certainVehicle.model} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Location: '} />
              <TextContainer text={certainVehicle.location} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Installmentpaid: '} />
              <TextContainer text={certainVehicle.installmentpaid} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Installmentduration: '} />
              <TextContainer text={certainVehicle.installmentduration} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Delinquent: '} />
              <TextContainer text={certainVehicle.delinquent} />
            </FlexRow>
            <FlexRow style={style.flexContainerMarg}>
              <TextContainer text={'Description: '} />
              <TextContainer text={certainVehicle.description} />
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
