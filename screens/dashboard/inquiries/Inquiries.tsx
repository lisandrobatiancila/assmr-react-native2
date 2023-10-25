import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, RefreshControl} from 'react-native';
import {InquiriesModel} from '../../../models/inquiries/InquiriesModel';
import {EmptyRecord} from '../../../components/EmptRec/EmptyRecord';
import { APP_COLOR } from '../../../constants/colorConstant';
import { InquiriesService } from '../../../services/inquiries/Inquiries';
import { useUserContext } from '../../../context/User/UserContext';

const InquiriesScreen = () => {
    const inquiryService = new InquiriesService();
    const userContext = useUserContext();

  const [inquiryList, setInquiryList] = useState<InquiriesModel[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getInquiries();
  }, [refresh]);

  function getInquiries() {
    return inquiryService.getAllInquiries(userContext?.userId ?? 0);
  }
  function onRefreshing() {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }
  return (
    <View>
      <RefreshControl refreshing={refresh} onRefresh={onRefreshing}>
        <View style={style.inquiryStyleCont}>
          {inquiryList && <EmptyRecord text={'inquiry'} />}
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
  },
});
