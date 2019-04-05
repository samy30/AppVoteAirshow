import React from 'react';
import { ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { Button } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import { db } from "../config";

const { height, width } = Dimensions.get('screen');
const VoteAirshowRef = db.ref("/VoteAirshow");

export default class HomeScreen extends React.Component {
  state = {
    voteAirshowIsActive: {}
  };

  constructor() {
    super();
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
    }

    componentDidMount() {
      VoteAirshowRef.on('value', snapshot => {
        let data = snapshot.val();
        let item = data;
        this.setState({ voteAirshowIsActive:item });
      });
    }

  render() {
    const { navigation } = this.props;
    console.log(this.state.voteAirshowIsActive)
    return (
      <Block>
        <Block>
          <ImageBackground
            source={require('../assets/HomeScreen.png')}
            style={{ height: height, width: width}}
          >
            <Block center style={styles.bottom}>
              <Button
                raised
                disabledStyle={styles.disabledButton}
                buttonStyle={styles.button}
                backgroundColor='#434360'
                title='COMMENCER LE VOTE'
                onPress={() => {
                  if(this.state.voteAirshowIsActive.value==0)
                  this.refs.toast.show("La vote n'a pas encore commencé!");
                  else if(this.state.voteAirshowIsActive.value==1)navigation.navigate('Vote');
                  else   this.refs.toast.show("La vote est terminée !");
                }
                }/>
            </Block>
          </ImageBackground>
          
        </Block>
        <Toast opacity={0.7} ref="toast"/>
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 4.7,
    backgroundColor: '#434360',
    borderRadius: 10
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '42%',
  },
  disabledButton: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 4.7,
    backgroundColor: '#434360',
    borderRadius: 10
  },
  buttonText: {
    justifyContent: 'center',
  }
});