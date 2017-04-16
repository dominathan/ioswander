import React, { Component } from 'react';
import { ListView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import { createLike } from '../services/apiActions';


export class Feed extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      feed: ds.cloneWithRows(props.feed)
    };
    this.renderFeed = this.renderFeed.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleBeenThere = this.handleBeenThere.bind(this);
  }

  handleLike(feed) {
    createLike({likee: feed.user.id, place_id: feed.place.id})
      .then(data => console.log("CREATED?", data))
      .catch(err => console.log("ERR CREATE LIKE", err))
  }

  handleBeenThere(feed) {

  }

  renderFeed(feed) {
    return (
      <ListItem
       roundAvatar
       subtitle={
         <View style={styles.subtitleView}>
           <Text style={styles.titleStyle}>
             {feed.user.first_name + ' '}
             <Text style={styles.unBold}>
               added
             </Text>
             {" " + feed.place.name}
           </Text>
           <Text style={styles.textComment}>
             {feed.comment}
           </Text>
           <View style={styles.likeAndBeen}>
             <TouchableOpacity onPress={() => this.handleLike(feed)}><Text style={styles.likeButton}>Like</Text></TouchableOpacity>
             <TouchableOpacity onPress={() => this.handleBeenThere(feed)}><Text style={styles.beenButton}>Been there</Text></TouchableOpacity>
           </View>
         </View>
       }
       hideChevron={true}
       avatar={{uri: feed.user.photo_url}}
       avatarStyle={styles.avatarStyle}
     />
    );
  }

  render() {
    return (
      <ListView
       dataSource={this.state.feed}
       renderRow={this.renderFeed}
       renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginLeft: 10,
    height: 65
  },
  subtitleView: {
    paddingLeft: 13,
    width: '80%'
  },
  bold: {
    fontWeight: '600'
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  textComment: {
    fontWeight: '100',
    flexWrap: 'wrap',
  },
  likeAndBeen: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10
  },
  likeButton: {
    color: 'gray'
  },
  beenButton: {
    color: 'gray',
    marginLeft: 45
  },
  titleStyle: {
    fontWeight: '600',
  },
  unBold: {
    fontWeight: '300'
  },
  avatarStyle: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: '2%'
  }

});
