import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { MyPropertyService } from '../../../../services/my-property/MyProperty';
import { useUserContext } from '../../../../context/User/UserContext';

const MyVehicleProperty = () => {
    const myProperties = new MyPropertyService();
    const userContext = useUserContext();

    useEffect(() => {
        console.log("tests");
        
        myProperties.getActiveUserProperties(userContext?.email)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }, []);

    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default MyVehicleProperty;