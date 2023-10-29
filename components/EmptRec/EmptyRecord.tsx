import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {CardContainer} from '../card/Card';
import {TextContainer} from '../Text/Text';

type EmptyRecordProps = {
  text?: string;
};

export const EmptyRecord = (props: EmptyRecordProps) => {
  return (
    <View style={style.emptContainer}>
      <CardContainer padding={'10px'}>
        <View style={style.secCont}>
          <TextContainer text={`No ${props.text ?? 'record'} to show.`} />
          <Image
            source={require('../../public/images/empty-box.png')}
            style={{width: 100, height: 100}}
          />
        </View>
      </CardContainer>
    </View>
  );
};

const style = StyleSheet.create({
  emptContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    height: '100%',
  },
  secCont: {
    alignItems: 'center',
  },
});
