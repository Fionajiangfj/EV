import PropTypes from 'prop-types'; // Import PropTypes
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CustomButton = ({ onPress, title, style, textStyle }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

CustomButton.propTypes = {
    onPress: PropTypes.func.isRequired, // Define onPress as a required function
    title: PropTypes.string.isRequired, // Define title as a required string
    style: PropTypes.object, // Define style as an optional object
    textStyle: PropTypes.object, // Define textStyle as an optional object
};

CustomButton.defaultProps = {
    style: {}, // Provide default empty object for style
    textStyle: {}, // Provide default empty object for textStyle
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default CustomButton;
