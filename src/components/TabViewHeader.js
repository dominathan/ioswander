import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

// Make a Component

const TabViewHeader = (props) => {
    const { imageViewStyle,
            profileImageStyle,
            textStyle,
            textStyleEmail,
            textViewStyle,
            viewStyle
    } = styles;

    const goToProfile = () => {
      props.drawer.close();
      Actions.profile({ person: props.user, type: 'reset' });
    };
    const user = props.user.user
    return (
      <TouchableOpacity onPress={() => goToProfile()}>
        {!user && <Text> Go To Profile </Text> }
        {user && <View style={viewStyle}>
            <View style={imageViewStyle}>
                <Image style={profileImageStyle} source={{ uri: user.photo_url }} />
            </View>
            <View style={textViewStyle}>
                <Text style={textStyle}>{user.first_name} {user.last_name}</Text>
                <Text style={textStyleEmail}>{user.email}</Text>
            </View>
        </View>}

      </TouchableOpacity>
    );
};

const styles = {
    imageViewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        marginRight: 15,
        marginLeft: 15
    },
    profileImageStyle: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    textStyle: {
        fontSize: 16,
        color: '#8D8F90'
    },
    textStyleEmail: {
        fontSize: 12,
        color: '#8D8F90'
    },
    textViewStyle: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    viewStyle: {
        backgroundColor: '#333B42',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
        height: 60,
        paddingTop: 15
    }
};

// Make the component available to other parts of the app
export default TabViewHeader;
