import React, { useRef, useState } from 'react';
import { View } from "react-native";
import { CustomButton } from './Button';
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
            <CustomButton onPress={()=>console.log("Button Pressed")} title="Book now"/>
        </View>
        
    );
}

export default BottomSheet;