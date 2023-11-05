/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TextContainer} from '../../../components/Text/Text';
import {FlatList, RefreshControl, View, Image} from 'react-native';
import {AdminService} from '../../../services/admin-service/admin-service';
import {CardContainer} from '../../../components/card/Card';
import {FlexRow} from '../../../components/Flex-Row/styles';
import {FlexCol} from '../../../components/Flex-Col';
import {
  formatDate,
  upperCaseUserFullName,
} from '../../../utils/utilsStandAlone';
import {AssmrBadge} from '../../../components/badge/Badge';
import {
  SUCCESS_COLOR,
  SUCCESS_EMERALD,
  WHITE_COLOR,
} from '../../../constants/colorConstant';
import {TouchableContainer} from '../../../components/Touchable';
import {EmptyRecord} from '../../../components/EmptRec/EmptyRecord';

export const AdminHistory = () => {
  const adminService = new AdminService();

  const [refresh, setRefresh] = useState<boolean>(false);
  const [hitoryList, setHistoryList] = useState<any>([]);

  useEffect(() => {
    getHistories()
      .then((response: any) => {
        const {data} = response;
        setHistoryList(data.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [refresh]);
  const setOnRefreshing = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  function getHistories() {
    return adminService.getHitories();
  }
  function renderHistoryItem({item}: any) {
    const ownerFullName = `${item.userOwner_lastname}, ${item.userOwner_firstname}`;
    const assumerFullName = `${item.userAssumer_lastname}, ${item.userAssumer_firstname}`;
    return (
      <>
        <CardContainer margin={'8px 0 8px 0'} padding={'5px'}>
          <FlexRow style={{justifyContent: 'space-evenly'}}>
            <FlexCol>
              <Image
                source={require('../../../public/images/user.png')}
                style={{width: 50, height: 50, alignSelf: 'center'}}
              />
              <TextContainer
                text={upperCaseUserFullName(ownerFullName)}
                fontWeight={'500'}
              />
              <AssmrBadge borderRadius={100} backgroundColor={SUCCESS_COLOR}>
                <TextContainer text={'owner'} fontWeight={'500'} />
              </AssmrBadge>
            </FlexCol>
            <FlexCol>
              <Image
                source={require('../../../public/images/user.png')}
                style={{width: 50, height: 50, alignSelf: 'center'}}
              />
              <TextContainer
                text={upperCaseUserFullName(assumerFullName)}
                fontWeight={'500'}
              />
              <AssmrBadge borderRadius={100} backgroundColor={SUCCESS_EMERALD}>
                <TextContainer text={'assumer'} fontWeight={'500'} />
              </AssmrBadge>
            </FlexCol>
          </FlexRow>
          <View style={{alignItems: 'center', padding: 10}}>
            <FlexRow>
              <TextContainer text={'Property type: '} fontWeight={'500'} />
              <TextContainer
                text={item.property_property_type}
                fontWeight={'500'}
              />
            </FlexRow>
            <FlexRow>
              <TextContainer text={'Assumed date: '} fontWeight={'500'} />
              <TextContainer
                text={formatDate(item.assumpt_transaction_dat)}
                fontWeight={'500'}
              />
            </FlexRow>
          </View>
          <TouchableContainer borderRadius={'10px'} padding={'10px'}>
            <TextContainer
              color={WHITE_COLOR}
              text={'view details'}
              textTransform={'capitalize'}
            />
          </TouchableContainer>
        </CardContainer>
      </>
    );
  }
  return (
    <>
      <View style={{padding: 10}}>
        <RefreshControl refreshing={refresh} onRefresh={setOnRefreshing}>
          {hitoryList.length ? (
            <FlatList data={hitoryList} renderItem={renderHistoryItem} />
          ) : (
            <EmptyRecord />
          )}
        </RefreshControl>
      </View>
    </>
  );
};
