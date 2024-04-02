import Sheet, {SheetRef} from 'react-modal-sheet';
import { useRef, useState } from "react";
import { View } from "react-native";

const BottomSheet = () => {

    const [isOpen, setOpen] = useState(false);
    const ref = useRef(SheetRef);

    return (
        <View>
            <Pressable onPress={() => setOpen(true)}>
                <Icon name="map-marker-alt" size={28} color= '#0064B1' />
            </Pressable>

            {/* <Sheet isOpen={isOpen} onClose={() => setOpen(false)} snapPoints={[600, 400, 100, 0]} initialSnap={1}>
                <Sheet.Container >
                    <Sheet.Content style={{ paddingBottom: ref.current?.y }}>

                    </Sheet.Content>
                </Sheet.Container>

        
            </Sheet> */}
            
        </View>
        
    );
}

export default BottomSheet;