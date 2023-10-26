import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  FlatList,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import {InquiriesModel} from '../../../models/inquiries/InquiriesModel';
import {EmptyRecord} from '../../../components/EmptRec/EmptyRecord';
import {
  APP_COLOR,
  INFO_COLOR,
  WHITE_COLOR,
} from '../../../constants/colorConstant';
import {InquiriesService} from '../../../services/inquiries/Inquiries';
import {useUserContext} from '../../../context/User/UserContext';
import {CardContainer} from '../../../components/card/Card';
import {FlexRow} from '../../../components/Flex-Row/styles';
import {TextContainer} from '../../../components/Text/Text';
import {upperCaseUserFullName} from '../../../utils/utilsStandAlone';
import {DividerContainer} from '../../../components/Divider/Divider';
import {AssmrBadge} from '../../../components/badge/Badge';
import { TouchableContainer } from '../../../components/Touchable';

const InquiriesScreen = () => {
  const inquiryService = new InquiriesService();
  const userContext = useUserContext();

  const [inquiryList, setInquiryList] = useState<InquiriesModel[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getInquiries();
  }, [refresh]);

  async function getInquiries() {
    const resp = await inquiryService.getAllInquiries(userContext?.userId ?? 0);
    const {data} = resp.data;

    setInquiryList(data);
  }
  function onRefreshing() {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }
  function displayInquiries({item}: any) {
    const fullName = upperCaseUserFullName(
      `${item.lastname}, ${item.firstname}`,
    );
    const email = item.email;
    const phoneNumber = item.phoneNumber;
    return (
      <CardContainer padding={'10px'}>
        <FlexRow>
          <View style={style.cardLeft}>
            <Image
              source={require('../../../public/images/user.png')}
              style={{width: 50, height: 50}}
            />
          </View>
          <View style={style.cardRight}>
            <FlexRow>
              <TextContainer
                text={'Name: '}
                textAlign={'left'}
                fontWeight={'500'}
              />
              <TextContainer text={fullName} textAlign={'left'} />
            </FlexRow>
            <FlexRow>
              <TextContainer
                text={'Email: '}
                textAlign={'left'}
                fontWeight={'500'}
              />
              <TextContainer text={email} textAlign={'left'} />
            </FlexRow>
            <FlexRow>
              <TextContainer
                text={'Contact#: '}
                textAlign={'left'}
                fontWeight={'500'}
              />
              <TextContainer text={phoneNumber} textAlign={'left'} />
            </FlexRow>
          </View>
        </FlexRow>
        <DividerContainer
          backgroundColor={INFO_COLOR}
          width={Dimensions.get('window').width - 40}
          height={3}
        />
        <AssmrBadge borderRadius={10} margin={5}>
          <FlexRow>
            <TextContainer text={'Address: '} color={WHITE_COLOR} />
            <TextContainer text={item.address} />
          </FlexRow>
        </AssmrBadge>
        <AssmrBadge borderRadius={10} margin={3}>
          <FlexRow>
            <TextContainer text={'Second Address: '} color={WHITE_COLOR} />
            <TextContainer text={item.addressLine2} />
          </FlexRow>
        </AssmrBadge>
        <AssmrBadge borderRadius={10} margin={3}>
          <FlexRow>
            <TextContainer text={'zipCode: '} color={WHITE_COLOR} />
            <TextContainer text={item.zipCode} />
          </FlexRow>
        </AssmrBadge>
        <TouchableContainer>
          <View>
            <FlexRow>
              <TextContainer text={'Toggle description'} textAlign={'left'} />
              <View style={style.imgStyle}>
                <Image source={require('../../../public/images/arrow.png')} style={{width: 20, height: 20}} />
              </View>
            </FlexRow>
          </View>
        </TouchableContainer>
      </CardContainer>
    );
  }
  return (
    <View>
      <RefreshControl refreshing={refresh} onRefresh={onRefreshing}>
        <View style={style.inquiryStyleCont}>
          {inquiryList.length === 0 && <EmptyRecord text={'inquiry'} />}
          {inquiryList.length > 0 && (
            <FlatList data={inquiryList} renderItem={displayInquiries} />
          )}
        </View>
      </RefreshControl>
    </View>
  );
};

export default InquiriesScreen;

const style = StyleSheet.create({
  inquiryStyleCont: {
    height: '100%',
    backgroundColor: APP_COLOR,
    padding: 10,
  },
  cardLeft: {
    padding: 10,
  },
  cardRight: {
    padding: 10,
  },
  imgStyle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  }
});
