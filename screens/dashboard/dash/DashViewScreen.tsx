import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useUserContext} from '../../../context/User/UserContext';
import {UnderMaintenance} from '../../../components/maintenance/UnderMaintanance';
import {TextContainer} from '../../../components/Text/Text';
import {BarChart} from 'react-native-chart-kit';
import {instance} from '../../../utils/appUtils';
import {CardContainer} from '../../../components/card/Card';

const DashViewScreen = () => {
  const userContext = useUserContext();
  useEffect(() => {
    userContext?.setUnderMaintenance(false);
    getGraphForDashBoard();
  }, []);
  function getGraphForDashBoard() {
    return instance.get(
      'dashboard/dashboard-graphs/' + userContext?.userId ?? '0',
    );
  }
  return (
    <View>
      {userContext?.underMaintenance && <UnderMaintenance />}
      {!userContext?.underMaintenance && (
        <>
          <View style={style.barContainer}>
            <CardContainer padding={'5px'}>
              <TextContainer
                text={'Most posted property.'}
                textAlign={'left'}
              />
              <BarChart
                data={{
                  labels: ['jan', 'feb'],
                  datasets: [
                    {
                      data: [20, 40],
                    },
                  ],
                }}
                chartConfig={{
                  color: (o: any) => `rgba(255, 255, 255, ${o})`,
                }}
                width={'100%'}
                height={100}
              />
            </CardContainer>
            <CardContainer padding={'5px'}>
              <TextContainer
                text={'Most assumed property.'}
                textAlign={'left'}
              />
            </CardContainer>
          </View>
        </>
      )}
    </View>
  );
};

export default DashViewScreen;

const style = StyleSheet.create({
  barContainer: {
    padding: 5,
  },
});
