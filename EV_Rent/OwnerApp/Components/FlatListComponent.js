import { FlatList, StyleSheet } from "react-native";

const FlatListComponent = ({ data, keyExtractor, renderItem, ItemSeparatorComponent }) => {
    return (

        // customized flat list component
        <FlatList
            style={styles.videoList}
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
        />

    );
}

export default FlatListComponent;

const styles = StyleSheet.create({
    // List design
    videoList: {
        alignContent: "flex-start",
        width: "100%",
        height: "100%",
        marginTop: 65,
    },
})