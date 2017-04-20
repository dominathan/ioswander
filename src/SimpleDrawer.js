import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import TabView from './TabView';

class SimpleDrawer extends Component {
  static propTypes = {
    navigationState: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  componentDidMount() {
    Actions.refresh({key: 'drawer', ref: this.refs.navigation})
    this.setCurrentUser();
  }

  setCurrentUser() {
    AsyncStorage.getItem('user', (err, user) => {
      this.setState({user: JSON.parse(user)});
    });
  }

  render() {
    const state = this.props.navigationState;
    const children = state.children;
    const user = this.state.user;
    return (
      <Drawer
       ref="navigation"
       open={state.open}
       onOpen={() => Actions.refresh({ key: state.key, open: true })}
       onClose={() => Actions.refresh({ key: state.key, open: false })}
       type="displace"
       content={<TabView user={user}/>}
       tapToClose={true}
       openDrawerOffset={0.2}
       panCloseMask={0.2}
       negotiatePan={true}
       tweenHandler={(ratio) => ({
        main: { opacity: Math.max(0.54, 1 - ratio) }
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
      </Drawer>
    );
  }
}

export default SimpleDrawer;
