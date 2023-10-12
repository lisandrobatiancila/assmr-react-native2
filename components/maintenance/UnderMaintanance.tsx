import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextContainer} from '../Text/Text';
import {WHITE_COLOR} from '../../constants/colorConstant';
import {CardContainer} from '../card/Card';

export const UnderMaintenance = () => {
  return (
    <View style={style.maintenanceContainer}>
      <CardContainer height={'200px'} padding={'10px'}>
        <TextContainer
          fontSize={'20px'}
          text={'This feature is not yet ready.'}
        />
      </CardContainer>
    </View>
  );
};

const style = StyleSheet.create({
  maintenanceContainer: {
    backgroundColor: WHITE_COLOR,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
});
