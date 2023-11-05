import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
  FlatList,
} from 'react-native';
import {useUserContext} from '../../../context/User/UserContext';
import {TextContainer} from '../../../components/Text/Text';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {instance} from '../../../utils/appUtils';
import {CardContainer} from '../../../components/card/Card';
import {upperCaseUserFullName} from '../../../utils/utilsStandAlone';
import Loading from '../../../components/Loading/Loading';
import {useLoadingContext} from '../../../context/Loading/LoadingContext';
import {DividerContainer} from '../../../components/Divider/Divider';
import {
  APP_COLOR,
  SUCCESS_EMERALD,
  WHITE_COLOR,
  assumedColorList,
} from '../../../constants/colorConstant';
import {AssmrBadge} from '../../../components/badge/Badge';

const DashViewScreen = () => {
  const WIDTH: number = Dimensions.get('screen').width;

  const [refresh, setRefresh] = useState<boolean>(false);
  const [mostPostedDatasets, setMostPostedDatasets] = useState<number[]>([]);
  const [mostAssumedDatasets, setMostAssumedDatasets] = useState<any>([]);
  const [postedPropertyInformation, setPostedPropertyInformation] =
    useState<any>(null);
  const [preferredByGender, setPreferredByGender] = useState<any>(null);

  const loadingContext = useLoadingContext();
  const userContext = useUserContext();

  useEffect(() => {
    userContext?.setUnderMaintenance(false);
    getGraphForDashBoard();
  }, [refresh]);
  async function getGraphForDashBoard() {
    try {
      const response = await instance.get(
        'dashboard/dashboard-graphs-most-posted-property/' +
          userContext?.userId ?? '0',
      );
      const result = response.data;
      const {data} = result;
      const datasetsTotalPosted = [];
      const datasetsTotalAssuemd = [];
      // console.log(data);
      for (let i = 0; i < Object.keys(data.totalPosted).length; i++) {
        datasetsTotalPosted.push(
          data.totalPosted[Object.keys(data.totalPosted)[i]],
        );
        // console.log(data.totalPosted[Object.keys(data.totalPosted)[i]])
      } // most posted property
      for (let i = 0; i < Object.keys(data.totalAssumed).length; i++) {
        // console.log(Object.keys(data.totalAssumed)[i]+" : "+typeof(data.totalAssumed[Object.keys(data.totalAssumed)[i]]));
        datasetsTotalAssuemd.push({
          name: Object.keys(data.totalAssumed)[i],
          assumed: data.totalAssumed[Object.keys(data.totalAssumed)[i]],
          // +2 * Math.floor(Math.random() * 100)
          color:
            assumedColorList[
              Math.floor(Math.random() * assumedColorList.length)
            ],
          legendFontColor: '#000',
          legendFontSize: 15,
        });
        // data.totalAssumed[Object.keys(data.totalAssumed)[i]]
        // console.log(data.totalAssumed[Object.keys(data.totalAssumed)[i]]);
      }

      setMostPostedDatasets(datasetsTotalPosted);
      setMostAssumedDatasets(datasetsTotalAssuemd);
      setPostedPropertyInformation(data.postedPropertyInformation);
      setPreferredByGender(data.preferredByGender);

      let preferredByGender = [];
      preferredByGender = data.preferredByGender;
      for (let i = 0; i < preferredByGender.length; i++) {
        if (i === 0) {
          preferredByGender[
            i
          ].message = `There are ${preferredByGender[i].total} ${preferredByGender[i].gender} assumed ${preferredByGender[i].property_type} property.`;
        } else {
          if (
            preferredByGender[i - 1].property_type ===
            preferredByGender[i].property_type
          ) {
            preferredByGender[i - 1].id += 1;
            preferredByGender[i - 1].message = `There are ${
              preferredByGender[i - 1].total
            } ${preferredByGender[i - 1].gender} and ${
              preferredByGender[i].total
            } ${preferredByGender[i].gender} assumed ${
              preferredByGender[i].property_type
            } property.`;
            i += 1;
          }
        }
      }
      data.preferredByGender.pop();
      setPreferredByGender(data.preferredByGender);

      loadingContext?.setIsLoading(false);
    } catch (err: any) {
      ToastAndroid.show('DasViewScreen ' + err.message, ToastAndroid.LONG);
    }
  }
  const setOnRefresh = () => {
    setRefresh(true);
    loadingContext?.setIsLoading(true);
    setTimeout(() => {
      loadingContext?.setIsLoading(false);
      setRefresh(false);
    }, 1000);
  };
  const chartConfiguration = () => {
    return {
      styleMostPosted: {
        backgroundColor: SUCCESS_EMERALD,
      },
      chart: {
        backgroundGradientFrom: '#28B463',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#ccc',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
        decimalPlaces: 0,
      },
      styleMostAssumed: {
        backgroundColor: WHITE_COLOR,
      },
    };
  };

  function displayPreferredByGender({item}: any) {
    return (
      <View key={item.id}>
        <TextContainer
          text={item.message}
          fontWeight={'400'}
          textAlign={'left'}
          fontSize={'18px'}
        />
      </View>
    );
  }

  return (
    <RefreshControl refreshing={refresh} onRefresh={setOnRefresh}>
      <FlatList
        data={[1]}
        renderItem={({item}) => (
          <View style={style.barContainer}>
            <CardContainer padding={'5px'}>
              <TextContainer
                fontSize={'18px'}
                text={'Most posted property.'}
                textAlign={'left'}
                margin={'10px 0 13px 13px'}
                fontWeight={'bold'}
              />
              {loadingContext?.isLoading ? (
                <Loading text={'Fetching most posted property.'} />
              ) : (
                <BarChart
                  style={chartConfiguration().styleMostPosted}
                  data={{
                    labels: [
                      upperCaseUserFullName('vehicle'),
                      upperCaseUserFullName('realestate'),
                      upperCaseUserFullName('jewelry'),
                    ],
                    datasets: [
                      {
                        data: mostPostedDatasets,
                      },
                    ],
                  }}
                  width={WIDTH}
                  height={220}
                  chartConfig={chartConfiguration().chart}
                  verticalLabelRotation={-30}
                />
              )}
            </CardContainer>
            <DividerContainer height={5} />
            <CardContainer padding={'5px'}>
              <TextContainer
                text={'Most assumed property.'}
                textAlign={'left'}
                fontSize={'18px'}
                margin={'10px 0 13px 13px'}
                fontWeight={'bold'}
              />
              {loadingContext?.isLoading ? (
                <Loading text={'Fetching assumed property.'} />
              ) : (
                <PieChart
                  data={mostAssumedDatasets}
                  style={chartConfiguration().styleMostAssumed}
                  width={WIDTH}
                  height={220}
                  chartConfig={chartConfiguration().chart}
                  accessor={'assumed'}
                  backgroundColor={'transparent'}
                  // paddingLeft={'15'}
                  // center={[10, 50]}
                  absolute
                />
              )}
            </CardContainer>
            <CardContainer padding={'5px'} margin={'5px 0 0 0'}>
              <TextContainer
                text={'Gender Preferred property.'}
                textAlign={'left'}
                fontSize={'18px'}
                margin={'10px 0 13px 13px'}
                fontWeight={'bold'}
              />
              {preferredByGender && (
                <FlatList
                  data={preferredByGender}
                  renderItem={displayPreferredByGender}
                />
              )}
            </CardContainer>
            <CardContainer padding={'5px'} margin={'5px 0 0 0'}>
              <TextContainer
                text={'Your posted property Info.'}
                textAlign={'left'}
                fontSize={'18px'}
                margin={'10px 0 13px 13px'}
                fontWeight={'bold'}
              />
              {postedPropertyInformation && (
                <>
                  <AssmrBadge
                    backgroundColor={SUCCESS_EMERALD}
                    width={'100%'}
                    borderRadius={10}>
                    <TextContainer
                      text={`There were ${postedPropertyInformation.yourPostedPropertyThatWasAssumed} people assumed your property.`}
                      fontSize={'18px'}
                      fontWeight={'500'}
                      textAlign={'left'}
                    />
                  </AssmrBadge>
                  <AssmrBadge
                    backgroundColor={APP_COLOR}
                    width={'100%'}
                    borderRadius={10}
                    marginTop={5}>
                    <TextContainer
                      text={`There were ${postedPropertyInformation.yourPostedPropertyThatCancelledTheirAssumption} people cancelled assumption of your property.`}
                      fontSize={'18px'}
                      fontWeight={'500'}
                      textAlign={'left'}
                    />
                  </AssmrBadge>
                </>
              )}
            </CardContainer>
          </View>
        )}
      />
    </RefreshControl>
  );
};

export default DashViewScreen;

const style = StyleSheet.create({
  barContainer: {
    padding: 5,
  },
});
