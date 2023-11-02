/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FlatList, TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Card} from 'react-native-paper';
import {BASEURL} from '../../../../utils/appUtils';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MyPropertyService } from '../../../../services/my-property/MyProperty';
import { TextContainer } from '../../../../components/Text/Text';
import { CardContainer } from '../../../../components/card/Card';
import { SUCCESS_COLOR } from '../../../../constants/colorConstant';
<<<<<<< Updated upstream
import { MyJewelryPropertyModel } from '../../../../models/my-property/MyProperty';
<<<<<<< Updated upstream
import { upperCaseUserFullName } from '../../../../utils/utilsStandAlone';
=======
=======
import { upperCaseUserFullName } from '../../../../utils/utilsStandAlone';
>>>>>>> Stashed changes
>>>>>>> Stashed changes


const MyJewelryProperty = ({jewelryData, navigation}: any) => {
  const myPropService = new MyPropertyService();

  function onSelectAction(jewelry: any, actionType: string) {
    const {jewelry_id} = jewelry;
    switch (actionType) {
      case 'view-jewelry':
        navigation.navigate('ViewMyJewelry', { jewelryID: jewelry_id });
      break;
      case 'update-jewelry':
        navigation.navigate('UpdateMyJewelry', { jewelryID: jewelry_id });
      break;
      case 'remove-jewelry':
        const {jewelry_jewelry_name} = jewelry;
        const mess: string = 'Are you sure you want to remove this property? ' + upperCaseUserFullName(jewelry_jewelry_name);
        Alert.alert('Message', mess, [
          {
            text: 'Cancel',
          },
          {
            text: 'Confirm',
            onPress: () => onRemoveJewelry(jewelry_id),
          },
        ]);
      break;
    default:
      console.log('no actionType');
    }
    // navigation.navigate("ViewMyVehicle")
  }
  async function onRemoveJewelry(jewelryID: number) {
    const response = await myPropService.removeCertainJewelryProperty(jewelryID);
    const {data} = response;
    const {code, message} = data;
    if (code !== 200) {
      Alert.alert('Message', 'Something went wrong');
      return;
    }
    Alert.alert('Message', message);
  }
  function onOpenAssumerList(item: any) {
    // unsed model MyJewelryPropertyModel
    const {jewelry_propertyId} = item;
    navigation.navigate('ListAllAssumer', {propertyId: jewelry_propertyId, propType: 'jewelry'});
  }
  return (
    <View>
      {jewelryData.length === 0 ? (
        <View style={{justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <Image source={
          require('../../../../public/images/empty-box.png')
          } style={{width: 100, height: 100}} />
          <CardContainer padding={'10px'}>
            <TextContainer text={'No posted Property'} />
          </CardContainer>
        </View>
      ) : (
        <TouchableWithoutFeedback
          style={{height: Dimensions.get('window').height - 180}}>
          <FlatList
            data={jewelryData}
            renderItem={({item}) => (
              <>
                <Card style={style.cardContainer}>
                  <TouchableOpacity
                    style={[
                      {
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        position: 'relative',
                        alignContent: 'flex-end',
                        alignSelf: 'flex-end',
                      },
                    ]}>
                    <Menu>
                        <MenuTrigger children = {<View>
                          <View style={style.dotCircleContainer}>
                            <View
                              style={{
                                position: 'absolute',
                                right: 20,
                                width: 40,
                                height: 40,
                                backgroundColor: '#fff',
                                borderRadius: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <View style={[style.dotCircle]}>
                                <Text>1</Text>
                              </View>
                              <View style={[style.dotCircle]}>
                                <Text>2</Text>
                              </View>
                              <View style={[style.dotCircle]}>
                                <Text>3</Text>
                              </View>
                            </View>
                          </View>
                        </View>}
                        />

                        <MenuOptions>
                          <MenuOption text="View" style={style.menuOptPadd} onSelect={() => onSelectAction(item, 'view-jewelry')}/>
                          <MenuOption text="Update" style={style.menuOptPadd} onSelect={() => onSelectAction(item, 'update-jewelry')} />
                          <MenuOption text="Remove" style={style.menuOptPadd} onSelect={() => onSelectAction(item, 'remove-jewelry')} />
                        </MenuOptions>
                    </Menu>
                  </TouchableOpacity>
                  <Image
                    source={{
                      uri:
                        BASEURL +
                        '/' +
                        JSON.parse(item.jewelry_jewelry_image)[0],
                    }}
                    style={{width: 'auto', height: 150, zIndex: -1}}
                    alt={'Image'}
                  />
                  <View style={{position: 'absolute', top: 100, right: 0}}>
                    <TouchableOpacity style={style.assumptionStyle}
                      onPress={() => onOpenAssumerList(item)}>
                      <TextContainer text={`+${item.totalAssumption}`} fontWeight={'500'} fontSize={'20px'} />
                    </TouchableOpacity>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Owner: {item.jewelry_jewelry_owner}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Location: {item.jewelry_jewelry_location}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Name: {item.jewelry_jewelry_name}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Model: {item.jewelry_jewelry_model}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Karat: {item.jewelry_jewelry_karat}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Grams: {item.jewelry_jewelry_grams}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Material: {item.jewelry_jewelry_material}</Text>
                  </View>
                </Card>
              </>
            )}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginTop: 10,
    position: 'relative',
  },
  textCap: {
    textTransform: 'capitalize',
  },
  dotCircle: {
    width: 6,
    height: 6,
    backgroundColor: '#000',
    borderRadius: 100,
    marginTop: 1,
  },
  dotCircleContainer: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  menuOptPadd: {
    padding: 10,
  },
  assumptionStyle: {
    width: 50,
    height: 50,
    backgroundColor: SUCCESS_COLOR,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 20,
  },
});

export default MyJewelryProperty;
