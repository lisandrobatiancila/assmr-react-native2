import { View, Text, TouchableOpacity } from 'react-native';
import { TextCenter, PopupContainer } from './styles';

type PopUpProps = {
    isOpened: boolean,
    callbackUpdateParentState: () => void
}
export const PopUp = ( { isOpened, callbackUpdateParentState}: PopUpProps ) => {
    return (
        <View style={{width: 100, backgroundColor: "red", borderRadius: 10, position: "absolute", right: 40}}>
            <PopupContainer style={{padding: 10}}>
                <TouchableOpacity><TextCenter>view</TextCenter></TouchableOpacity>
                <TouchableOpacity><TextCenter>update</TextCenter></TouchableOpacity>
                <TouchableOpacity><TextCenter>remove</TextCenter></TouchableOpacity>
            </PopupContainer>
        </View>
    )
}