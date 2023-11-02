/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {FlexRow} from '../Flex-Row/styles';
import {TextContainer} from '../Text/Text';
import {useSearchContext} from '../../context/Search/SearchContext';
export const SearchComponent = () => {
  const userCon = useSearchContext();

  const toggleSearchBar = () => {
    userCon?.setOpenSearch(!userCon.openSearch);
  };
  return (
    <View style={{width: '95%'}}>
      <FlexRow style={{justifyContent: 'space-between'}}>
        <TextContainer text={'Properties'} fontSize={'20px'} />
        {!userCon?.openSearch && (
          <TouchableOpacity onPress={toggleSearchBar}>
            <Image
              source={require('../../public/images/search.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        )}
        {userCon?.openSearch && (
          <TouchableOpacity onPress={toggleSearchBar}>
            <Image
              source={require('../../public/images/cross.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        )}
      </FlexRow>
    </View>
  );
};
