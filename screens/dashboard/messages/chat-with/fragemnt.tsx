import React from 'react';
import {View} from 'react-native';
import {TextContainer} from '../../../../components/Text/Text';
import {CardContainer} from '../../../../components/card/Card';

type ActiveUserProps = {
  name: string;
  message: string;
  date: string;
};
export const ActiveUser = (props: ActiveUserProps) => {
  return (
    <View style={{alignItems: 'flex-end'}}>
      <CardContainer width={'auto'} padding={'10px'}>
        <View>
          <View />
          <View>
            <TextContainer textAlign={'right'} text={props.message} />
          </View>
        </View>
      </CardContainer>
    </View>
  );
};

export const OtherUser = (props: ActiveUserProps) => {
  return (
    <View style={{alignItems: 'flex-start'}}>
      <CardContainer width={'auto'} padding={'10px'}>
        <View>
          <View />
          <View>
            <TextContainer textAlign={'left'} text={props.message} />
          </View>
        </View>
      </CardContainer>
    </View>
  );
};
