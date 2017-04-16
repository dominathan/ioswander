import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ListView } from 'react-native';

import { getPlace } from '../../services/apiActions';
import { Feed } from '../feed/Feed';
import { Map } from '../map/Map';
import ProfileStats from '../profile/ProfileStats';

export class PlaceProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: [],
      markers: [],
      favorites: [],
      photos: [],
      place: undefined,
      selectedFilter: 'feed'
    };

    this.getPlace = this.getPlace.bind(this);
  }

  componentWillMount() {
    this.getPlace();
  }

  selectedFilterChange(val) {
    this.setState({
      selectedFilter: val,
      feedType: val
    });
  }

  getPlace() {
    console.log('props!', this.props)
    getPlace(this.props.place)
      .then(data => {
        console.log('data', data);
        const list = data.favorites.map(favorite => {
          return {
            place: {
              name: favorite.name
            }
          };
        });
        const feed = data.feed.map(item => {
          item['place'] = data.place;
          item['person'] = item.user;
          return item;
        })
        this.setState({
          markers: [data.place],
          favorites: data.favorites,
          favoritesList: list,
          feed: data.feed,
          place: data.place,
          photos: data.images,
          feedType: 'feed'
        });
      })
      .catch((err) => console.log('fuck balls: ', err));
  }

  render() {
    const { favorites, favoritesList, feed, feedType, markers, place, selectedFilter } = this.state;

    return (
      <View style={styles.container}>
        <Map markers={markers} styles={styles.mapContainer} />
        <View style={styles.detailsContainer}>
          { place && <View style={styles.profileDetailsContainer}>
            <View style={styles.profileTextContainer}>
              <Text style={styles.name}>{place.name}</Text>
            </View>
          </View> }
          <View style={styles.statsContainer}>
            <ProfileStats label="Favorites" icon="star-o" data={favorites.length} />
          </View>
          <View style={styles.listContainer}>
            <View style={styles.filtersContainer}>
              <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('feed')}>
                <Text style={selectedFilter === 'feed' ? styles.selectedFilter : styles.filters}>FEED</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('favoritesList')}>
                <Text style={selectedFilter === 'favorites' ? styles.selectedFilter : styles.filters}>FAVORITES</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.privatePress} onPress={() => this.selectedFilterChange('photos')}>
                <Text style={selectedFilter === 'photos' ? styles.selectedFilter : styles.filters}>PHOTOS</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.feed}>
               {(feedType === 'feed') && <Feed showButtons={true} feed={feed} />}
               {(feedType === 'likes') && <Feed feed={favoritesList} />}
             </View>
             <View>
               {(feedType === 'photos') && <ImageFeed feed={photos} />}
             </View>
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  detailsContainer: {
    flex: 1,
    position: 'relative'
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 45,
    borderBottomWidth: 0.4,
    borderBottomColor: '#8D8F90',
  },
  filters: {
    marginRight: 10,
    marginLeft: 15,
    alignSelf: 'center',
    color: '#8D8F90',
    paddingTop: 12
  },
  selectedFilter: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    paddingTop: 12,
    marginRight: 10,
    marginLeft: 15,
  },
  selectedFilterButton: {
    color: '#4296CC',
    borderBottomWidth: 1,
    borderBottomColor: '#4296CC',
    marginRight: 10,
    marginLeft: 25,
  },
  filterButton: {
    alignSelf: 'center',
    position: 'absolute',
    right: 15,
    top: 12
  },
  filterButtonText: {
    color: '#8D8F90',
  },
  listContainer: {
    flex: 3
  },
  mapContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    alignSelf: 'flex-start',
    paddingTop: 15
  },
  profileDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f4f4f4'
  },
  profileImageContainer: {
    flex: 1
  },
  profileTextContainer: {
    flex: 3,
    marginLeft: 10
  },
  photo: {
    height: 70,
    width: 70,
    borderRadius: 35,
    alignSelf: 'flex-start',
    position: 'absolute',
    top: -15,
    marginLeft: 5,
    borderWidth: 2,
    borderColor: '#FFF'
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    paddingBottom: 0
  },
  feed: {

  }
});
