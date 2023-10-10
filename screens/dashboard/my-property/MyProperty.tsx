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
import {MyVehiclePropertyModel} from '../../../models/my-property/MyProperty';
import {MyPropertyService} from '../../../services/my-property/MyProperty';

const MyPropertiesScreen = ({routes, navigation}: any) => {
  const myProperties = new MyPropertyService();

  const userContext = useUserContext();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeView, setActiveView] = useState<string>('vehicle');

  const [onOpenPropToUpload, setOnOpenPropToUpload] = useState<boolean>(false);
  const [propToUploadValue, setPropToUploadValue] = useState(null);
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

  const [vehicleList, setVehicleList] = useState<MyVehiclePropertyModel[] | []>(
    [],
  );
  useEffect(() => {
    switch (activeView) {
      case 'vehicle':
        getAllVehicleData();
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
        const {data}: any = response.data;
        setVehicleList(data);
      })
      .catch((err: any) => console.log(err));
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

  return (
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
      <View style={style.mypropContainer}>
        <View style={style.welcomeMessContainer}>
          <Text
            style={[
              style.textCapitalize,
              style.textCenter,
              style.textSize,
              style.shadowContainer,
            ]}>
            my properties
          </Text>
        </View>
        {activeView === 'vehicle' ? (
          <MyVehicleProperty
            vehicleData={vehicleList}
            navigation={navigation}
          />
        ) : (
          ''
        )}
        <TouchableOpacity style={style.touchOppa} onPress={onOpenGallery}>
          <Image
            source={require('../../../public/images/add.png')}
            width={50}
            height={50}
            alt="Img"
          />
        </TouchableOpacity>
        {openModal ? (
          <Modal animationType={'slide'} visible transparent>
            <FlatList
              data={[1]}
              renderItem={({item}) => (
                <View style={style.modalContainer}>
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
                    />
                    {propToUploadValue ? (
                      propToUploadValue === 'Vehicle' ? (
                        <VehicleProperty
                          email={userContext?.email}
                          closeModal={closeModal}
                        />
                      ) : (
                        ''
                      )
                    ) : (
                      <VehicleProperty
                        email={userContext?.email}
                        closeModal={closeModal}
                      />
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
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 100,
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  modalContainer: {
    height: Dimensions.get('window').height + 400, // just a working fix right now
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
