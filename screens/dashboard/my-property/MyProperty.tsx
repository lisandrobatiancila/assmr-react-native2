/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Dimensions,
  Modal,
  StyleSheet,
} from 'react-native';
import {useUserContext} from '../../../context/User/UserContext';
import {useState, useEffect} from 'react';
import {Card} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import MyVehicleProperty from './vehicle/MyVehicleProperty';
import VehicleProperty from '../../../components/upload-property/VehicleProperty';
import {
  MyJewelryPropertyModel,
  MyRealestatePropertyModel,
  MyVehiclePropertyModel,
} from '../../../models/my-property/MyProperty';
import {MyPropertyService} from '../../../services/my-property/MyProperty';
import {TextContainer} from '../../../components/Text/Text';
import {
  APP_COLOR,
  INFO_COLOR,
  SUCCESS_EMERALD,
  WHITE_COLOR,
} from '../../../constants/colorConstant';
import JewelryProperty from '../../../components/upload-property/JewelryProperty';
import {CardContainer} from '../../../components/card/Card';
import {FlexRow} from '../../../components/Flex-Row/styles';
import MyJewelryProperty from './jewelry/MyJewelry';
import MyRealestateProperty from './realestate/MyRealestate';
import RealestateProperty from '../../../components/upload-property/RealestateProperty';

const MyPropertiesScreen = ({routes, navigation}: any) => {
  const myProperties = new MyPropertyService();

  const userContext = useUserContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('vehicle');

  const [onOpenPropToUpload, setOnOpenPropToUpload] = useState<boolean>(false);
  const [propToUploadValue, setPropToUploadValue] = useState('Vehicle');
  const [propToUploadItems, setPropToUploadItems] = useState<
    {label: string; value: string}[]
  >([
    {
      label: 'Vehicle',
      value: 'Vehicle',
    },
    {
      label: 'Jewelry',
      value: 'Jewelry',
    },
    {
      label: 'Realestate',
      value: 'Realestate',
    },
  ]);
  const [addUp, setAddUp] = useState<number>(400);

  const [vehicleList, setVehicleList] = useState<MyVehiclePropertyModel[] | []>(
    [],
  );
  const [jewelryList, setJewelryList] = useState<MyJewelryPropertyModel[]>([]);
  const [realestateList, setRealestateList] = useState<
    MyRealestatePropertyModel[]
  >([]);

  useEffect(() => {
    switch (activeView) {
      case 'vehicle':
        getAllVehicleData();
        break;
      case 'jewelry':
        getAllJewelryData();
        break;
      case 'realestate':
        break;
      default:
        console.log('No active view.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing, activeView]);

  const getAllVehicleData = () => {
    myProperties
      .getActiveUserProperties(userContext?.email)
      .then((response: any) => {
        const {data}: MyVehiclePropertyModel[] = response.data;
        setVehicleList(data);
      })
      .catch((err: any) => console.log(err));
  };
  const getAllJewelryData = () => {
    myProperties
      .getActiveUserJewelry(userContext?.email ?? '')
      .then((response: any) => {
        const data: any = response.data;
        const jewelryList: MyJewelryPropertyModel[] = data.data;

        setJewelryList(jewelryList);
      })
      .catch((err: any) => console.log(err));
  };
  const getAllRealestateData = () => {
    myProperties
      .getActiveUserRealestate(userContext?.email ?? '')
      .then((response: any) => {
        const data: any = response.data;
        const realestateList: MyJewelryPropertyModel[] = data.data;

        setRealestateList(realestateList);
      })
      .catch((err: any) => console.log(err));
  };
  const onChangePropertyActiveView = (propType: string) => {
    switch (propType) {
      case 'vehicle':
        setActiveView(propType);
        break;
      case 'jewelry':
        setActiveView(propType);
        break;
      case 'realestate':
        setActiveView(propType);
        break;
      default:
        console.log('No propertyType');
    }
  };
  const onOpenGallery = async () => {
    try {
      // const files = await DocumentPicker.pick({ type: DocumentPicker.types.images });
      // const file = files[0];

      // const form = new FormData();
      // form.append("images", file);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  function onSelectPropertyToPost(propType: any) {
    setPropToUploadValue(propType);
    switch (propType) {
      case 'Vehicle':
        setAddUp(400);
        break;
      case 'Jewelry':
        setAddUp(700);
        break;
      case 'Realestate':
        setAddUp(300);
        break;
      default:
        console.log('No propertyType');
    }
  }

  return (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
      <View style={style.mypropContainer}>
        <View style={style.welcomeMessContainer}>
          <FlexRow style={{justifyContent: 'space-around'}}>
            <CardContainer
              padding={'10px'}
              backgroundColor={
                activeView === 'vehicle' ? APP_COLOR : WHITE_COLOR
              }>
              <TouchableOpacity
                onPress={() => onChangePropertyActiveView('vehicle')}>
                <Text
                  style={[
                    style.textCapitalize,
                    style.textCenter,
                    style.textSize,
                    style.shadowContainer,
                    {
                      color: activeView === 'vehicle' ? WHITE_COLOR : '#000',
                    },
                  ]}>
                  vehicle
                </Text>
              </TouchableOpacity>
            </CardContainer>
            <CardContainer
              padding={'10px'}
              backgroundColor={
                activeView === 'jewelry' ? APP_COLOR : WHITE_COLOR
              }>
              <TouchableOpacity
                onPress={() => onChangePropertyActiveView('jewelry')}>
                <Text
                  style={[
                    style.textCapitalize,
                    style.textCenter,
                    style.textSize,
                    style.shadowContainer,
                    {
                      color: activeView === 'jewelry' ? WHITE_COLOR : '#000',
                    },
                  ]}>
                  jewelry
                </Text>
              </TouchableOpacity>
            </CardContainer>
            <CardContainer
              padding={'10px'}
              backgroundColor={
                activeView === 'realestate' ? APP_COLOR : WHITE_COLOR
              }>
              <TouchableOpacity
                onPress={() => onChangePropertyActiveView('realestate')}>
                <Text
                  style={[
                    style.textCapitalize,
                    style.textCenter,
                    style.textSize,
                    style.shadowContainer,
                    {
                      color: activeView === 'realestate' ? WHITE_COLOR : '#000',
                    },
                  ]}>
                  realestate
                </Text>
              </TouchableOpacity>
            </CardContainer>
          </FlexRow>
        </View>
        {activeView === 'vehicle' ? (
          <MyVehicleProperty
            vehicleData={vehicleList}
            navigation={navigation}
          />
        ) : activeView === 'jewelry' ? (
          <MyJewelryProperty
            jewelryData={jewelryList}
            navigation={navigation}
          />
        ) : activeView === 'realestate' ? (
          <MyRealestateProperty
            realestateData={realestateList}
            navigation={navigation}
          />
        ) : (
          <TextContainer text={'No content to show'} />
        )}
        <TouchableOpacity style={style.touchOppa} onPress={onOpenGallery}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../public/images/add.png')}
              style={{width: 20, height: 20}}
              alt="Img"
            />
          </View>
        </TouchableOpacity>
        {openModal ? (
          <Modal animationType={'slide'} visible transparent>
            <FlatList
              data={[1]}
              renderItem={({item}) => (
                <View
                  style={[
                    style.modalContainer,
                    {height: Dimensions.get('window').height + addUp},
                  ]}>
                  <Card style={{padding: 10}}>
                    <Text
                      style={{
                        textAlign: 'center',
                        textTransform: 'capitalize',
                        fontSize: 20,
                        fontWeight: '500',
                      }}>
                      upload your property!
                    </Text>
                  </Card>
                  <View style={{marginTop: 10}}>
                    <DropDownPicker
                      open={onOpenPropToUpload}
                      value={propToUploadValue}
                      items={propToUploadItems}
                      setOpen={setOnOpenPropToUpload}
                      setValue={setPropToUploadValue}
                      setItems={setPropToUploadItems}
                      placeholder="Select a property"
                      style={{marginTop: 5}}
                      onChangeValue={onSelectPropertyToPost}
                      zIndex={5}
                    />
                    {propToUploadValue === 'Vehicle' ? (
                      <VehicleProperty
                        email={userContext?.email}
                        closeModal={closeModal}
                      />
                    ) : propToUploadValue === 'Jewelry' ? (
                      <JewelryProperty
                        email={userContext?.email}
                        closeModal={closeModal}
                      />
                    ) : propToUploadValue === 'Realestate' ? (
                      <RealestateProperty
                        email={userContext?.email}
                        closeModal={closeModal}
                      />
                    ) : (
                      ''
                    )}
                  </View>
                </View>
              )}
            />
            {/* end of Flatlist */}
          </Modal>
        ) : (
          ''
        )}
      </View>
    </RefreshControl>
  );
};

const style = StyleSheet.create({
  mypropContainer: {
    height: '100%',
    backgroundColor: '#EE4D2D',
    position: 'relative',
    padding: 10,
  },
  touchOppa: {
    backgroundColor: SUCCESS_EMERALD,
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  modalContainer: {
    backgroundColor: '#ddd',
    padding: 10,
  },
  welcomeMessContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  textCenter: {
    textAlign: 'center',
  },
  textSize: {
    fontSize: 18,
    fontWeight: '500',
  },
  shadowContainer: {
    shadowColor: '#ddd',
    shadowOffset: {
      width: 200,
      height: 200,
    },
    shadowRadius: 3,
  },
});

export default MyPropertiesScreen;
