import React, { Component } from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export class TabViewHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: false
    }
    this.goToProfile = this.goToProfile.bind(this)
  }

  goToProfile() {
    this.props.drawer.close();
    Actions.profile({ person: this.state.user, type: 'reset' });
  }

  render() {
    const { imageViewStyle,
            profileImageStyle,
            textStyle,
            textStyleEmail,
            textViewStyle,
            viewStyle
    } = styles;
    const { user } = this.state;
    if (user) {
        return (
          <TouchableOpacity onPress={() => this.goToProfile()}>
              <View style={viewStyle}>
                  <View style={imageViewStyle}>
                      <Image style={profileImageStyle} source={{ uri: user.photo_url }} />
                  </View>
                  <View style={textViewStyle}>
                      <Text style={textStyle}>{user.first_name} {user.last_name}</Text>
                      <Text style={textStyleEmail}>{user.email}</Text>
                  </View>
              </View>
            </TouchableOpacity> 

        );
    } else {
      return (
        <Text> MISSING USER </Text>
      )
    }

  }
}


// const TabViewHeader = (props) => {
//     const { imageViewStyle,
//             profileImageStyle,
//             textStyle,
//             textStyleEmail,
//             textViewStyle,
//             viewStyle
//     } = styles;
//
//     const goToProfile = () => {
//       props.drawer.close();
//       Actions.profile({ person: props.user, type: 'reset' });
//     };
//
//
//     return (
//       props.users ?
//         <TouchableOpacity onPress={() => goToProfile()}>
//           <View style={viewStyle}>
//               <View style={imageViewStyle}>
//                   <Image style={profileImageStyle} source={{ uri: props.user.photo_url }} />
//               </View>
//               <View style={textViewStyle}>
//                   <Text style={textStyle}>{props.user.first_name} {props.user.last_name}</Text>
//                   <Text style={textStyleEmail}>{props.user.email}</Text>
//               </View>
//           </View>
//         </TouchableOpacity> :
//         <TouchableOpacity>
//         </TouchableOpacity>
//     );
// };



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
