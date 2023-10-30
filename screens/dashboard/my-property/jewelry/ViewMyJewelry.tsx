/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Image, View, StyleSheet, ScrollView} from 'react-native';
import {CardContainer} from '../../../../components/card/Card';
import {TextContainer} from '../../../../components/Text/Text';
import {MyPropertyService} from '../../../../services/my-property/MyProperty';
import {BASEURL} from '../../../../utils/appUtils';
import {FlexRow} from '../../../../components/Flex-Row/styles';
import {upperCaseUserFullName} from '../../../../utils/utilsStandAlone';
import {FlexCol} from '../../../../components/Flex-Col';
import {AssmrBadge} from '../../../../components/badge/Badge';
import {WHITE_COLOR} from '../../../../constants/colorConstant';

export function ViewMyJewelry({route}: any) {
  const {jewelryID} = route.params;
  const mypropServ = new MyPropertyService();

  const [certainJewelry, setCertainJewelry] = useState<any>();
  useEffect(() => {
    getCertainJewelry()
      .then((response: any) => {
        const resp = response.data;
        const {data} = resp;
        // setCertainJewelry({...data});
        setCertainJewelry(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, []);
  function getCertainJewelry() {
    return mypropServ.getCertainJewelry(jewelryID);
  }
  return (
    <ScrollView>
      <View style={style.rootContainer}>
        <CardContainer>
          {certainJewelry && (
            <CardContainer padding={'10px'}>
              {certainJewelry && (
                <Image
                  source={{
                    uri:
                      BASEURL +
                      '/' +
                      JSON.parse(certainJewelry.jewelry_jewelry_image)[0],
                  }}
                  style={style.imgStyle}
                />
              )}
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Owner: '} />
                <TextContainer
                  text={upperCaseUserFullName(
                    certainJewelry.jewelry_jewelry_owner,
                  )}
                />
              </FlexRow>
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Name: '} />
                <TextContainer text={certainJewelry.jewelry_jewelry_name} />
              </FlexRow>
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Model: '} />
                <TextContainer text={certainJewelry.jewelry_jewelry_model} />
              </FlexRow>
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Location: '} />
                <TextContainer text={certainJewelry.jewelry_jewelry_location} />
              </FlexRow>
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Installmentpaid: '} />
                <TextContainer
                  text={certainJewelry.jewelry_jewelry_installmentpaid}
                />
              </FlexRow>
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Installmentduration: '} />
                <TextContainer
                  text={certainJewelry.jewelry_jewelry_installmentduration}
                />
              </FlexRow>
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Delinquent: '} />
                <TextContainer
                  text={certainJewelry.jewelry_jewelry_delinquent}
                />
              </FlexRow>
              <FlexRow style={style.flexContainerMarg}>
                <TextContainer text={'Description: '} />
                <TextContainer
                  text={certainJewelry.jewelry_jewelry_description}
                />
              </FlexRow>
              <CardContainer padding={'10px'} margin={'10px 0 0 0'}>
                <TextContainer text={'Other description'} textAlign={'left'} />
                <FlexCol>
                  <AssmrBadge
                    padding={5}
                    borderRadius={100}
                    width={90}
                    marginTop={5}>
                    <FlexRow>
                      <TextContainer
                        color={WHITE_COLOR}
                        text={'Karat: '}
                        textAlign={'center'}
                      />
                      <TextContainer
                        color={WHITE_COLOR}
                        text={certainJewelry.jewelry_jewelry_karat}
                        textAlign={'left'}
                      />
                    </FlexRow>
                  </AssmrBadge>
                </FlexCol>
                <FlexCol>
                  <AssmrBadge
                    padding={5}
                    borderRadius={100}
                    width={90}
                    marginTop={5}>
                    <FlexRow>
                      <TextContainer
                        color={WHITE_COLOR}
                        text={'Grams: '}
                        textAlign={'center'}
                      />
                      <TextContainer
                        color={WHITE_COLOR}
                        text={certainJewelry.jewelry_jewelry_grams}
                        textAlign={'left'}
                      />
                    </FlexRow>
                  </AssmrBadge>
                </FlexCol>
                <FlexCol>
                  <AssmrBadge
                    padding={5}
                    borderRadius={100}
                    width={90}
                    marginTop={5}>
                    <FlexRow>
                      <TextContainer
                        color={WHITE_COLOR}
                        text={'Material: '}
                        textAlign={'center'}
                      />
                      <TextContainer
                        color={WHITE_COLOR}
                        text={certainJewelry.jewelry_jewelry_material}
                        textAlign={'left'}
                      />
                    </FlexRow>
                  </AssmrBadge>
                </FlexCol>
              </CardContainer>
            </CardContainer>
          )}
        </CardContainer>
      </View>
    </ScrollView>
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
