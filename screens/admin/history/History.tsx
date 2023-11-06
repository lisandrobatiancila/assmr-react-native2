/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TextContainer} from '../../../components/Text/Text';
import {FlatList, RefreshControl, View, Image, Dimensions} from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';

export const AdminHistory = () => {
  const adminService = new AdminService();

  const [refresh, setRefresh] = useState<boolean>(false);
  const [hitoryList, setHistoryList] = useState<any>([]);
  const [historyItem, setHistoryItem] = useState<
    {label: string; value: string}[]
  >([
    {
      label: 'accept/successfull transaction',
      value: 'accept/succesffull transaction',
    },
    {
      label: 'cancelled transaction',
      value: 'cancelled transaction',
    },
    {
      label: 'assumed transaction',
      value: 'assumed transaction',
    },
    {
      label: 'posted property',
      value: 'posted property',
    },
    {
      label: 'deleted property',
      value: 'deleted property',
    },
    {
      label: 'on-going transaction',
      value: 'on-going transaction',
    },
  ]);
  const [historyValue, setHistoryValue] = useState<string>(
    'on-going transaction',
  );
  const [toggledHistory, setToggledHistory] = useState<boolean>(false);

  useEffect(() => {
    setHistoryList([]);
    getHistories()
      .then((response: any) => {
        const {data} = response;
        const {result} = data.data; // without type
        if (historyValue === 'on-going transaction') {
          setHistoryList(result);
        } else if (historyValue === 'deleted property') {
          setHistoryList(result); // with type
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }, [refresh, historyValue]);
  const setOnRefreshing = () => {
    setHistoryList([]);
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  function getHistories() {
    return adminService.getHitories(historyValue);
  }
  function renderOnGoingHistoryTransaction({item}: any) {
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
  function renderDeletedPropertyHistory({item}: any) {
    return (
      <CardContainer padding={'5px'} margin={'8px 0 8px 0'}>
        <Image
          source={require('../../../public/images/user.png')}
          style={{width: 50, height: 50, alignSelf: 'center'}}
        />
        {item.property_property_type === 'vehicle' ? (
          <>
            <TextContainer
              text={upperCaseUserFullName(item.vehicle_owner)}
              fontSize={'20px'}
              fontWeight={'300'}
            />
            <TextContainer
              text={`Downpayment: ${item.vehicle_downpayment}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Installmentpaid: ${item.vehicle_installmentpaid}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Location: ${item.vehicle_location}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Property Type: ${item.property_property_type}`}
              fontSize={'20px'}
              textAlign={'left'}
            />
          </>
        ) : item.property_property_type === 'realestate' ? (
          <>
            <TextContainer
              text={upperCaseUserFullName(item.realestate_owner)}
              fontSize={'20px'}
              fontWeight={'300'}
            />
            <TextContainer
              text={`Downpayment: ${item.realestate_downpayment}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Installmentpaid: ${item.realestate_installmentpaid}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Location: ${item.realestate_location}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Property Type: ${item.property_property_type}`}
              fontSize={'20px'}
              textAlign={'left'}
            />
          </>
        ) : item.property_property_type === 'jewelry' ? (
          <>
            <TextContainer
              text={upperCaseUserFullName(item.jewelry_jewelry_owner)}
              fontSize={'20px'}
              fontWeight={'300'}
            />
            <TextContainer
              text={`Name: ${item.jewelry_jewelry_name}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Model: ${item.jewelry_jewelry_model}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Downpayment: ${item.jewelry_jewelry_downpayment}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Installmentpaid: ${item.jewelry_jewelry_installmentpaid}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Location: ${item.jewelry_jewelry_location}`}
              fontSize={'20px'}
            />
            <TextContainer
              text={`Property Type: ${item.property_property_type}`}
              fontSize={'20px'}
              textAlign={'left'}
            />
          </>
        ) : (
          ''
        )}
      </CardContainer>
    );
  }
  function onChangeHistoryActino(param: any) {
    setHistoryValue(param);
  }
  return (
    <>
      <View style={{padding: 10}}>
        <DropDownPicker
          open={toggledHistory}
          items={historyItem}
          value={historyValue}
          setOpen={setToggledHistory}
          setItems={setHistoryItem}
          setValue={setHistoryValue}
          placeholder="Select action"
          onChangeValue={onChangeHistoryActino}
          style={{width: '60%', alignSelf: 'flex-end', marginBottom: 5}}
        />
        <RefreshControl refreshing={refresh} onRefresh={setOnRefreshing}>
          {hitoryList.length && historyValue === 'on-going transaction' ? (
            <View style={{height: Dimensions.get('screen').height - 250}}>
              <FlatList
                data={hitoryList}
                renderItem={renderOnGoingHistoryTransaction}
              />
            </View>
          ) : hitoryList.length && historyValue === 'deleted property' ? (
            <View style={{height: Dimensions.get('screen').height - 250}}>
              <FlatList
                data={hitoryList}
                renderItem={renderDeletedPropertyHistory}
              />
            </View>
          ) : (
            <EmptyRecord fontWeight={'500'} />
          )}
        </RefreshControl>
      </View>
    </>
  );
};
