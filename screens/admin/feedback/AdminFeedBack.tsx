/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {FlatList, Image, RefreshControl, View} from 'react-native';
import {TextContainer} from '../../../components/Text/Text';
import {AdminService} from '../../../services/admin-service/admin-service';
import {EmptyRecord} from '../../../components/EmptRec/EmptyRecord';
import {CardContainer} from '../../../components/card/Card';
import {
  formatDate,
  upperCaseUserFullName,
} from '../../../utils/utilsStandAlone';

export const AdminFeedBack = () => {
  const adminService = new AdminService();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [feedBackList, setFeedBackList] = useState<any>(null);

  useEffect(() => {
    getAllFeedBacks()
      .then((response: any) => {
        const {data} = response;
        setFeedBackList(data.data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [refresh]);

  function getAllFeedBacks() {
    return adminService.getAllFeedBack();
  }
  const setOnRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  function renderFeedBackItem({item}: any) {
    const fullName = upperCaseUserFullName(item.fullName);
    return (
      <>
        <CardContainer padding={'10px'} margin={'5px 0 0 0'}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../../public/images/user.png')}
              style={{width: 50, height: 50}}
            />
          </View>
          <TextContainer text={formatDate(item.feedBackDate)} />
          <TextContainer text={fullName} fontSize={'18px'} />
          <TextContainer text={item.email} fontSize={'12px'} />
          <TextContainer text={JSON.stringify(item.userComments)} />
        </CardContainer>
      </>
    );
  }
  return (
    <View style={{padding: 10}}>
      <RefreshControl refreshing={refresh} onRefresh={setOnRefresh}>
        {feedBackList ? (
          <FlatList data={feedBackList} renderItem={renderFeedBackItem} />
        ) : (
          <EmptyRecord />
        )}
      </RefreshControl>
    </View>
  );
};
