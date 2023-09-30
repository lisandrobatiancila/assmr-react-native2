import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { MyPropertyService } from '../../../../services/my-property/MyProperty';
import { useUserContext } from '../../../../context/User/UserContext';
import { MyVehiclePropertyModel } from '../../../../models/my-property/MyProperty';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { BASEURL } from '../../../../utils/appUtils';
import { PopUp } from '../popup/Popup';

type MyVehiclePropertyProps = {
    vehicleData: MyVehiclePropertyModel[] | []
};

const MyVehicleProperty = ({ vehicleData }: MyVehiclePropertyProps) => {
    const [isOpenedPopup, setIsOpenedPopup] = useState<boolean>(false);
    const toggleIsOpenedPopup = useCallback(() => {
        
    }, [])
    return (
        <View>
            {
                vehicleData.length == 0? <Text>You have no vehicle posted.</Text>
                :(
                    <TouchableWithoutFeedback style={{ height: Dimensions.get('window').height-180 }}>
                        <FlatList
                        data={ vehicleData }
                        renderItem={({ item }) =>
                            <>
                                <Card style={ style.cardContainer }>
                                    <TouchableOpacity style={[{flexDirection: "column", alignItems: "flex-end", position: "relative", alignContent: "flex-end", alignSelf: "flex-end"}]}>
                                        <View style={style.dotCircleContainer}>
                                            <View style={{position: "absolute", right: 0, width: 40, height: 40, backgroundColor: "#fff", borderRadius: 100, justifyContent: "center",alignItems: 'center'}}>
                                                <View style={[style.dotCircle]}><Text>1</Text></View>
                                                <View style={[style.dotCircle]}><Text>2</Text></View>
                                                <View style={[style.dotCircle]}><Text>3</Text></View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <PopUp isOpened = { isOpenedPopup} callbackUpdateParentState={ toggleIsOpenedPopup } />
                                    <Image source={{uri: BASEURL+'/'+JSON.parse(item.vehicleIMG[0].vehicleFrontIMG)[0] }} style={{width: "auto", height: 150, zIndex: -1}} alt={"Image"} />
                                    <Text style={ style.textCap }>Owner: { item.owner }</Text>
                                    <Text style={ style.textCap }>Location: { item.location }</Text>
                                    <Text style={ style.textCap }>Brand: { item.brand }</Text>
                                    <Text style={ style.textCap }>Model: { item.model }</Text>
                                </Card>
                            </>
                        }
                    />
                    </TouchableWithoutFeedback>
                )
            }
        </View>
    )
}

const style = StyleSheet.create({
    cardContainer: {
        padding: 10,
        marginTop: 10,
        position: "relative"
    },
    textCap: {
        textTransform: "capitalize"
    },
    dotCircle: {
        width: 6,
        height: 6,
        backgroundColor: "#000",
        borderRadius: 100,
        marginTop: 1,
    },
    dotCircleContainer: {
        position: "absolute",
        width: 20,
        height: 20,
    }
});

export default MyVehicleProperty;