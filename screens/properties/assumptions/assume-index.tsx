/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {CardContainer} from '../../../components/card/Card';
import {PropertyAssumptions} from '../../../services/property-assumptions/PropertyAssumptions';
import {TextInputContainer} from '../../../components/TextInput/TextInput';
import {TouchableContainer} from '../../../components/Touchable';
import {TextContainer} from '../../../components/Text/Text';
import {useUserContext} from '../../../context/User/UserContext';
import {PropertyAssumptionModel} from '../../../models/property-assumption/PropertyAssumption';
import {StandAloneMessageComponent} from '../../../components/message/Message';

type AssumptionFormProps = {
  route: any;
  navigation: any;
};

export default function AssumptionForm({
  route,
  navigation,
}: AssumptionFormProps) {
  const userContext = useUserContext();
  const {propertyID, ownerID, userEmail} = route.params;
  // ang userEmail diri kay ang email sa propertyOwner, same sa ownerID
  const propertyAssum = new PropertyAssumptions();
  const [firstname, setFirstname] = useState<string | undefined>('');
  const [middlename, setMiddlename] = useState<string | undefined>('');
  const [lastname, setLastname] = useState<string | undefined>('');
  const [contactno, setContactno] = useState<string>('');
  const [address, setAddress] = useState<string | undefined>('');
  const [job, setJob] = useState<string>('');
  const [monthSalary, setMonthlySalary] = useState<string>('');

  useEffect(() => {
    setFirstname(
      userContext?.firstname?.substring(0, 1)?.toUpperCase() +
        userContext?.firstname?.substring(1, userContext?.firstname.length),
    );
    setMiddlename(
      userContext?.middlename.substring(0, 1)?.toUpperCase() +
        userContext?.middlename?.substring(1, userContext?.middlename.length),
    );
    setLastname(
      userContext?.lastname?.substring(0, 1)?.toUpperCase() +
        userContext?.lastname?.substring(1, userContext?.lastname.length),
    );

    setAddress(userContext?.address);
  }, []);

  const onChange = (param: any, key: string) => {
    if (key === 'firstname') {
      setFirstname(param);
    } else if (key === 'middlename') {
      setMiddlename(param);
    } else if (key === 'lastname') {
      setLastname(param);
    } else if (key === 'contactno') {
      setContactno(param);
    } else if (key === 'address') {
      setAddress(param);
    } else if (key === 'job') {
      setJob(param);
    } else if (key === 'monthly salary') {
      setMonthlySalary(param);
    }
  };

  function submitAssumption() {
    const userID = userContext?.userId;
    const formData: PropertyAssumptionModel = {
      userID,
      propertyID,
      ownerID,
      firstname,
      middlename,
      lastname,
      contactno,
      address,
      job,
      monthSalary,
    };

    propertyAssum
      .submitAssumption(formData)
      .then(response => {
        const {data} = response;
        const {code, status, message} = data;
        if (code === 200) {
          Alert.alert('Message', message);

          return;
        } else {
          Alert.alert('Message', message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <ScrollView>
      <>
        <View style={style.assumptionCont}>
          <CardContainer height={'auto'} backgroundColor={'#fff'}>
            <View style={style.formContainer}>
              <TextInputContainer
                value={firstname}
                margin={'0 0 5px 0'}
                placeholder="Firstname"
                editable={false}
                width={'100%'}
              />
              <TextInputContainer
                value={middlename}
                margin={'0 0 5px 0'}
                placeholder="Middlename"
                editable={false}
                width={'100%'}
              />
              <TextInputContainer
                value={lastname}
                margin={'0 0 5px 0'}
                placeholder="Lastname"
                editable={false}
                width={'100%'}
              />
              <TextInputContainer
                value={contactno}
                onChangeText={(e: any, key: string) => onChange(e, 'contactno')}
                margin={'0 0 5px 0'}
                placeholder="Contactno"
                width={'100%'}
                keyboardType={'phone-pad'}
              />
              <TextInputContainer
                value={address}
                onChangeText={(e: any, key: string) => onChange(e, 'address')}
                margin={'0 0 5px 0'}
                placeholder="Address"
                width={'100%'}
              />
              <TextInputContainer
                value={job}
                onChangeText={(e: any, key: string) => onChange(e, 'job')}
                margin={'0 0 5px 0'}
                placeholder="Job"
                width={'100%'}
              />
              <TextInputContainer
                margin={'0 0 5px 0'}
                onChangeText={(e: any, key: string) =>
                  onChange(e, 'monthly salary')
                }
                value={monthSalary}
                placeholder="Monthly Salary"
                width={'100%'}
                keyboardType={'numeric'}
              />
              <TouchableContainer
                padding={'10px'}
                borderRadius={'5px'}
                margin={'5px 0 0 0'}
                onPress={submitAssumption}>
                <TextContainer
                  color={'#fff'}
                  fontSize={'18px'}
                  text={'Assume'}
                />
              </TouchableContainer>
            </View>
          </CardContainer>
        </View>
        <StandAloneMessageComponent
          navigation={navigation}
          email={userEmail}
          receiverId={ownerID}
        />
      </>
    </ScrollView>
  );
}

const style = StyleSheet.create({
  formContainer: {
    padding: 10,
  },
  assumptionCont: {
    padding: 5,
    height: Dimensions.get('window').height - 100,
  },
});
