/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { MyVehiclePropertyModel } from '../../../../models/my-property/MyProperty';


const MyVehicleProperty = ({vehicleData, navigation}: any) => {
  const myPropService = new MyPropertyService();

  function onSelectAction(vehicle: any, actionType: string) {
    const {vehicle_id} = vehicle;
    switch (actionType) {
      case 'view-vehicle':
        navigation.navigate('ViewMyVehicle', { vehicleID: vehicle_id });
      break;
      case 'update-vehicle':
        navigation.navigate('UpdateMyVehicle', { vehicleID: vehicle_id });
      break;
      case 'remove-vehicle':
        const {brand} = vehicle;
        const mess: string = 'Are you sure you want to remove this property? ' + brand;
        Alert.alert('Message', mess, [
          {
            text: 'Cancel',
          },
          {
            text: 'Confirm',
            onPress: () => onRemoveVehicle(vehicle_id),
          },
        ]);
      break;
    default:
      console.log('no actionType');
    }
    // navigation.navigate("ViewMyVehicle")
  }
  async function onRemoveVehicle(vehicleID: number) {
    const response = await myPropService.removeCertainVehicleProperty(vehicleID);
    const {data} = response;
    const {code, message} = data;
    if (code !== 200) {
      Alert.alert('Message', 'Something went wrong');
      return;
    }
    Alert.alert('Message', message);
  }
  function onOpenAssumerList(item: any) {
    // unused model MyVehiclePropertyModel
    const {vehicle_propertyId} = item;
    navigation.navigate('ListAllAssumer', {propertyId: vehicle_propertyId, propType: 'vehicle'});
  }
  return (
    <View>
      {vehicleData.length === 0 ? (
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
            data={vehicleData}
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
                          <MenuOption text="View" style={style.menuOptPadd} onSelect={() => onSelectAction(item, 'view-vehicle')}/>
                          <MenuOption text="Update" style={style.menuOptPadd} onSelect={() => onSelectAction(item, 'update-vehicle')} />
                          <MenuOption text="Remove" style={style.menuOptPadd} onSelect={() => onSelectAction(item, 'remove-vehicle')} />
                        </MenuOptions>
                    </Menu>
                  </TouchableOpacity>
                  <Image
                    source={{
                      uri:
                        BASEURL +
                        '/' +
                        JSON.parse(item.vehicle_image_vehicleFrontIMG)[0],
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
                    <Text style={style.textCap}>Owner: {item.vehicle_owner}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Location: {item.vehicle_location}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Brand: {item.vehicle_brand}</Text>
                  </View>
                  <View style={{padding: 5}}>
                    <Text style={style.textCap}>Model: {item.vehicle_model}</Text>
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

export default MyVehicleProperty;
