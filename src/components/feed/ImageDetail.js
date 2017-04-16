import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Tile } from 'react-native-elements';

export class ImageDetail extends Component {

    render() {
        return (
            <Tile
              imageSrc={this.props.image}
              containerStyle={styles.container}
              imageContainerStyle={styles.imageContainer}
            >
            </Tile>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageContainer: {
      flex: 3,
      width: null,
      height: null,
      resizeMode: 'contain'
    }
});
