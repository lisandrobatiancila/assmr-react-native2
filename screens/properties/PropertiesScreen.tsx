/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {VehicleProperties} from './vehicles';
import {useUserContext} from '../../context/User/UserContext';
import {useSearchContext} from '../../context/Search/SearchContext';
import {TextContainer} from '../../components/Text/Text';
import {SearchPrompt} from '../../components/search/SearchPrompt';
import {RealestateProperties} from './realestate';
import {JewelryProperties} from './jewelry';

type PropertiesScreenProps = {
  navigation: any;
};

const PropertiesScreen = ({navigation}: PropertiesScreenProps) => {
  const userContext = useUserContext();
  const searchContext = useSearchContext();
  const [filterPropType, setFilterPropType] = useState<string>('vehicle');
  const [filterRealestateType, setFilterRealestateType] =
    useState<string>('house and lot');

  const [filterOptions, setFilterOptions] = useState<any | null>(null);
  useEffect(() => {}, [searchContext?.openSearch]);
  BackHandler.addEventListener('hardwareBackPress', () => {
    const index = navigation.getState().index;
    if (index === 2 && userContext?.email) {
      navigation.navigate('Dashboard');
    }
  });
  const onDashboard = () => {
    navigation.navigate('Dashboard');
  };
  const propertyOnChangeFilter = (param: any, otherParam: any) => {
    if (otherParam) {
      setFilterRealestateType(otherParam);
      console.log('38: ' + param);
      setFilterOptions({});
      setFilterOptions({
        realestateType: otherParam,
      });
      console.log(otherParam);
      console.log('filter: ' + JSON.stringify(filterOptions));
    } else {
      setFilterOptions({});
    }
    setFilterPropType(param);
  };

  const onSearch = (params: any) => {
    const {propType, owner} = params;
    switch (propType) {
      case 'vehicle':
        const {brand, model} = params;
        setFilterOptions({});
        setFilterOptions({
          brand,
          model,
          owner,
        });
        break;
      case 'realestate':
        const {developer} = params;
        setFilterOptions({});
        setFilterOptions({...filterOptions, developer, owner});
        break;
      case 'jewelry':
        setFilterOptions({});
        setFilterOptions(params);
        break;
      default:
        console.log('screens/properties/vehicles/::68 => No propertyType');
    }
  }; // onButtonSearchPress
  return (
    <View style={style.screenContainer}>
      {searchContext?.openSearch && (
        <SearchPrompt
          onSearch={onSearch}
          propertyOnChangeFilter={propertyOnChangeFilter}
          propDefaultValue={filterPropType}
          filterRealestateType={filterRealestateType}
        />
      )}
      {filterPropType === 'vehicle' ? (
        <VehicleProperties
          navigation={navigation}
          filterOptions={filterOptions}
        />
      ) : filterPropType === 'realestate' ? (
        <RealestateProperties
          navigation={navigation}
          filterOptions={filterOptions}
        />
      ) : (
        <JewelryProperties
          navigation={navigation}
          filterOptions={filterOptions}
        />
      )}
      {/* HIDE HOME ICON */}
      {!searchContext?.openSearch && (
        <View style={{padding: 10, zIndex: 100}}>
          <TouchableOpacity
            style={[style.homeContainer, {padding: 10}]}
            onPress={onDashboard}>
            {/* <View style={[style.shadowProp, {padding: 10}]} /> */}
            <Image
              source={require('../../public/images/home.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  screenContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#EE4D2D',
    height: '100%',
    justifyContent: 'space-between',
  },
  homeContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -50,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 10,
    shadowRadius: 100,
  },
});
export default PropertiesScreen;
