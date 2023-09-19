import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

type LoadingPorps = {
    text: string
};

const Loading = ({ text }: LoadingPorps) => {
    return (
        <View style={ style.loadingContainer }>
            <View style = {style.spinner}>
                <ActivityIndicator size={"large"} />
                <Text style={{ textAlign: "center", color: "#000", textAlignVertical: "center", fontSize: 18 }}>{ text }</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    loadingContainer: {
        position: "absolute",
        bottom: 0,
        padding: 5,
        zIndex: 100,
        height: "100%",
        width: "100%",
        alignSelf: "center",
        backgroundColor: "#ddd"
    },
    spinner: {
        flex: 1,
        justifyContent: "center"
    }
});

export default Loading;