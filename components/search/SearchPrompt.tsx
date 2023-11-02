/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Keyboard, FlatList} from 'react-native';
import {CardContainer} from '../card/Card';
import {TextContainer} from '../Text/Text';
import DropDownPicker from 'react-native-dropdown-picker';
import {FlexRow} from '../Flex-Row/styles';
import {FlexCol} from '../Flex-Col';
import {
  FIVE_COLOR,
  INFO_COLOR,
  SUCCESS_EMERALD,
  WHITE_COLOR,
} from '../../constants/colorConstant';
import {AssmrBadge} from '../badge/Badge';
import {TouchableContainer} from '../Touchable';
import {RadioButton} from 'react-native-paper';

type SearchProps = {
  onSearch: (params: any) => void;
  propertyOnChangeFilter: (params: any, otherParam: any) => void;
  propDefaultValue: string;
  filterRealestateType: string;
};
export const SearchPrompt = ({
  onSearch,
  propertyOnChangeFilter,
  propDefaultValue,
  filterRealestateType,
}: SearchProps) => {
  const [propertyItems, setPropertyItems] = useState<
    {label: string; value: string}[]
  >([
    {
      label: 'Vehicle',
      value: 'vehicle',
    },
    {
      label: 'Realestate',
      value: 'realestate',
    },
    {
      label: 'Jewelry',
      value: 'jewelry',
    },
  ]);
  const [propertyValue, setPropertyValue] = useState<string>(propDefaultValue);
  const [openProperty, setOpenProperty] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(390);

  const [owner, setOwner] = useState<string>('');
  const [vehicleBrand, setVehicleBrand] = useState<string>('');
  const [vehicleModel, setVehicleModel] = useState<string>('');
  // END vehicle SIDE

  const [developer, setDeveloper] = useState<string>('');
  const [check, setChecked] = useState<string>(filterRealestateType);
  // END realestate SIDE

  const [jewelryName, setJewelryName] = useState<string>('');
  const [jewelryModel, setJewelryModel] = useState<string>('');
  const [karat, setKarat] = useState<string>('');
  const [grams, setGrams] = useState<string>('');
  const [material, setMaterial] = useState<string>('');

  // END jewelry SIDE
  Keyboard.addListener('keyboardDidShow', function (e: any) {
    const height = e.endCoordinates.height;
    setKeyboardHeight(height);
  });
  Keyboard.addListener('keyboardDidHide', function() {
    setKeyboardHeight(390);
  });

  const searchOnChangeFilter = (param: any) => {
    propertyOnChangeFilter(param, param === 'realestate' ? check : undefined);
  };
  const onPressSearch = () => {
    let params = {};
    switch (propertyValue) {
      case 'vehicle':
        params = {
          propType: propertyValue,
          owner: owner,
          brand: vehicleBrand,
          model: vehicleModel,
        };
        break;
      case 'realestate':
        params = {
          propType: propertyValue,
          owner: owner,
          developer,
          realestateType: check, // can be :: 'house and lot', 'house', 'lot'
        };
        break;
      case 'jewelry':
        params = {
          propType: propertyValue,
          owner,
          name: jewelryName,
          model: jewelryModel,
          karat,
          grams,
          material,
        };
        break;
      default:
        console.log('No propertyType');
    }
    onSearch(params);
  };
  const onChangeRealestateType = (param: any) => {
    setChecked(param);
    propertyOnChangeFilter('realestate', param); // importante kay ni ang param diri AHAHAH; ma delay ang update sa useState gud.
  };

  const onRenderView = () => {
    return (
      <>
        <AssmrBadge
          padding={5}
          borderRadius={100}
          width={150}
          marginTop={5}
          marginBottom={5}>
          <TextContainer color={WHITE_COLOR} text={'Filter a property.'} />
        </AssmrBadge>
        <DropDownPicker
          open={openProperty}
          items={propertyItems}
          value={propertyValue}
          setOpen={setOpenProperty}
          setItems={setPropertyItems}
          setValue={setPropertyValue}
          placeholder={propertyValue}
          onChangeValue={searchOnChangeFilter}
        />
        {propertyValue === 'vehicle' ? (
          <View style={{overflow: 'scroll'}}>
            <FlexCol>
              <TextContainer
                text={'Owner'}
                textAlign={'left'}
                margin={'5px 0'}
              />
              <TextInput
                value={owner}
                placeholder={'Owner'}
                onChangeText={setOwner}
                style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
              />
              <TextContainer
                text={'Brand'}
                textAlign={'left'}
                margin={'5px 0'}
              />
              <TextInput
                placeholder={'Brand'}
                onChangeText={setVehicleBrand}
                style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
              />
              <TextContainer
                text={'Model'}
                textAlign={'left'}
                margin={'5px 0'}
              />
              <TextInput
                placeholder={'Model'}
                onChangeText={setVehicleModel}
                style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
              />
              <FlexRow style={{width: '100%'}}>
                <TouchableContainer
                  backgroundColor={SUCCESS_EMERALD}
                  padding={'8px'}
                  borderRadius={'10px'}
                  margin={'10px 0 0 0'}
                  width={'50%'}
                  onPress={onPressSearch}>
                  <TextContainer
                    color={WHITE_COLOR}
                    text={'search'}
                    textTransform={'capitalize'}
                  />
                </TouchableContainer>
                <TouchableContainer
                  backgroundColor={INFO_COLOR}
                  padding={'8px'}
                  borderRadius={'10px'}
                  margin={'10px 0 0 0'}
                  width={'50%'}>
                  <TextContainer
                    color={WHITE_COLOR}
                    text={'clear'}
                    textTransform={'capitalize'}
                  />
                </TouchableContainer>
              </FlexRow>
              {/* <TextContainer text={'Downpayment'} textAlign={'left'} />
              <TextInput placeholder={'Downpayment'} />
              <TextContainer text={'Installmentpaid'} textAlign={'left'} />
              <TextInput placeholder={'Installmentpaid'} />
              <TextContainer text={'Installmentduration'} textAlign={'left'} />
              <TextInput placeholder={'Installmentduration'} />
              <TextContainer text={'Delinquent'} textAlign={'left'} />
              <TextInput placeholder={'Delinquent'} />
              <TextContainer text={'Location'} textAlign={'left'} />
              <TextInput placeholder={'Location'} /> */}
            </FlexCol>
          </View>
        ) : propertyValue === 'realestate' ? (
          <View style={{overflow: 'scroll'}}>
            <FlexCol>
              <FlexRow>
                <FlexRow style={{alignItems: 'center'}}>
                  <RadioButton
                    color={
                      check === 'house and lot' ? SUCCESS_EMERALD : FIVE_COLOR
                    }
                    value={'House and lot'}
                    status={check === 'house and lot' ? 'checked' : 'unchecked'}
                    onPress={() => onChangeRealestateType('house and lot')}
                  />
                  <TextContainer text={'House and lot'} />
                </FlexRow>
                <FlexRow style={{alignItems: 'center'}}>
                  <RadioButton
                    color={check === 'house' ? SUCCESS_EMERALD : FIVE_COLOR}
                    value={'House'}
                    status={check === 'house' ? 'checked' : 'unchecked'}
                    onPress={() => onChangeRealestateType('house')}
                  />
                  <TextContainer text={'House'} />
                </FlexRow>
                <FlexRow style={{alignItems: 'center'}}>
                  <RadioButton
                    color={check === 'lot' ? SUCCESS_EMERALD : FIVE_COLOR}
                    value={'Lot'}
                    status={check === 'lot' ? 'checked' : 'unchecked'}
                    onPress={() => onChangeRealestateType('lot')}
                  />
                  <TextContainer text={'Lot'} />
                </FlexRow>
              </FlexRow>
              <TextContainer
                text={'Owner'}
                textAlign={'left'}
                margin={'5px 0'}
              />
              <TextInput
                value={owner}
                onChangeText={setOwner}
                placeholder={'Owner'}
                style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
              />

              <TextContainer
                text={'Developer'}
                textAlign={'left'}
                margin={'5px 0'}
              />
              <TextInput
                value={developer}
                onChangeText={setDeveloper}
                placeholder={'Developer'}
                style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
              />

              <FlexRow style={{width: '100%'}}>
                <TouchableContainer
                  backgroundColor={SUCCESS_EMERALD}
                  padding={'8px'}
                  borderRadius={'10px'}
                  margin={'10px 0 0 0'}
                  width={'50%'}
                  onPress={onPressSearch}>
                  <TextContainer
                    color={WHITE_COLOR}
                    text={'search'}
                    textTransform={'capitalize'}
                  />
                </TouchableContainer>
                <TouchableContainer
                  backgroundColor={INFO_COLOR}
                  padding={'8px'}
                  borderRadius={'10px'}
                  margin={'10px 0 0 0'}
                  width={'50%'}>
                  <TextContainer
                    color={WHITE_COLOR}
                    text={'clear'}
                    textTransform={'capitalize'}
                  />
                </TouchableContainer>
              </FlexRow>
            </FlexCol>
          </View>
        ) : (
          <View style={{overflow: 'scroll'}}>
            <TextContainer text={'Owner'} textAlign={'left'} margin={'5px 0'} />
            <TextInput
              value={owner}
              onChangeText={setOwner}
              placeholder={'Owner'}
              style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
            />
            <TextContainer
              text={'Jewelry Name'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInput
              value={jewelryName}
              onChangeText={setJewelryName}
              placeholder={'Name'}
              style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
            />
            <TextContainer
              text={'Jewelry Model'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInput
              value={jewelryModel}
              onChangeText={setJewelryModel}
              placeholder={'Model'}
              style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
            />
            <TextContainer text={'Karat'} textAlign={'left'} margin={'5px 0'} />
            <TextInput
              value={karat}
              onChangeText={setKarat}
              placeholder={'Karat'}
              style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
            />
            <TextContainer text={'Grams'} textAlign={'left'} margin={'5px 0'} />
            <TextInput
              value={grams}
              onChangeText={setGrams}
              placeholder={'Grams'}
              style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
            />
            <TextContainer
              text={'Material'}
              textAlign={'left'}
              margin={'5px 0'}
            />
            <TextInput
              value={material}
              onChangeText={setMaterial}
              placeholder={'Material'}
              style={{backgroundColor: WHITE_COLOR, borderRadius: 5}}
            />
            <FlexRow style={{width: '100%'}}>
              <TouchableContainer
                backgroundColor={SUCCESS_EMERALD}
                padding={'8px'}
                borderRadius={'10px'}
                margin={'10px 0 0 0'}
                width={'50%'}
                onPress={onPressSearch}>
                <TextContainer
                  color={WHITE_COLOR}
                  text={'search'}
                  textTransform={'capitalize'}
                />
              </TouchableContainer>
              <TouchableContainer
                backgroundColor={INFO_COLOR}
                padding={'8px'}
                borderRadius={'10px'}
                margin={'10px 0 0 0'}
                width={'50%'}>
                <TextContainer
                  color={WHITE_COLOR}
                  text={'clear'}
                  textTransform={'capitalize'}
                />
              </TouchableContainer>
            </FlexRow>
          </View>
        )}
      </>
    );
  };
  return (
    <View style={style.searchContainer}>
      <CardContainer padding={'10px'} backgroundColor={FIVE_COLOR}>
        <FlatList
          data={[1]}
          renderItem={onRenderView}
          style={{height: keyboardHeight}}
        />
      </CardContainer>
    </View>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 100,
    width: '100%',
    marginTop: 10,
    alignSelf: 'center',
  },
});
