import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

type PropertiesScreenProps = {
    navigation: any
};

const PropertiesScreen = ({ navigation }: any) => {
    const onDashboard = () => {
        navigation.navigate('Dashboard')
    }
    return (
        <View style={ style.screenContainer }>
            <View>

            </View>
            <View style={{padding: 10}}>
                <TouchableOpacity style={ [style.homeContainer, {padding: 10}] } onPress={ onDashboard }>
                    <View style={[style.shadowProp, {padding: 10}]}>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    screenContainer: {
        backgroundColor: "#EE4D2D",
        height: "100%",
        justifyContent: "space-between"
    },
    homeContainer: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 100,
        alignSelf: "center",
    },
    shadowProp: {
        shadowColor: '#000',
        shadowOffset: {width: 5, height: 4},
        shadowOpacity: 10,
        shadowRadius: 100,
      },
})
export default PropertiesScreen;