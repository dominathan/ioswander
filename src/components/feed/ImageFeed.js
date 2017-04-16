import React, { Component } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { ImageDetail } from './ImageDetail';
import { Actions } from 'react-native-router-flux';

export class ImageFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    }
  }

  componentWillMount() {
    this.setState({images: this.props.images});
  }

  render() {
    console.log('images', this.state.images)
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { Actions.imageDetail({image: {uri: 'https://www.placecage.com/200/200'}}); }}>
          <Image style={{width: 50, height: 50}} source={{uri: 'https://www.placecage.com/200/200'}}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

// {
//   this.state.images.map(image => {
//     return <Text>{image.avatar_file_name}</Text>;
//   })
// }
