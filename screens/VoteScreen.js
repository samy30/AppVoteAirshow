import React from 'react';
import { StyleSheet, FlatList, View } from "react-native";
import { ListItem, Text, Icon, Button } from "react-native-elements";
import theme from "../constants/Theme";
import {removeVotedItem, retrieveVotedItem, storeVotedItem } from "../constants/utils";
import { db } from "../config";

const ref = db.ref("/AirshowParticipants");

export default class VoteScreen extends React.Component {

  constructor(props) {
    super(props);

    console.ignoredYellowBox = [
      'Setting a timer'
      ];

    this.state = {
      voted: false,
      isLoading: true,
      isFetching: false,
      votedItemIndex: null,
      participants: null
    };

    this.fetchData = this.fetchData.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleChangeVote = this.handleChangeVote.bind(this);
    this.vote = this.vote.bind(this);
  }

  // Uncomment this if you need to remove the vote from the phone's storage (ONLY FOR DEBUGGING PURPOSES).

  // componentWillMount() {
  //   removeVotedItem()
  //   .then(status => {
  //     console.log("Will mount: " + status);
  //   })
  // }

  componentDidMount() {
    retrieveVotedItem().then(result => {
      console.log(result);
      if (result != null) {
        this.setState({
          voted: true,
          votedItemIndex: result,
          isLoading: false,
          isFetching: false
        });
      } else {
        this.setState({
          voted: false,
          isLoading: false,
          isFetching: true,
          votedItemIndex: null,
        });
      }

      this.fetchData();
    });
  }

  fetchData() {
    ref.once("value").then(snap => {
      let participants = snap.val();
      console.log(participants);
      this.setState({
        participants,
        isFetching: false
      });
    });
  }

  vote(item, index) {
    let ref1 = db.ref("/AirshowParticipants/" + index);
    let newVotes = item.votes + 1;
    return ref1.update({ votes: newVotes });
  }

  unvote(item, index) {
    let ref1 = db.ref("/AirshowParticipants/" + index);
    let newVotes = item.votes - 1;
    return ref1.update({ votes: newVotes });
  }

  handleVote(item, index) {
    console.log('Hello!');
    this.vote(item, index)
      .then(() => {
        storeVotedItem(index).then(status => {
          console.log("Store voted item status: "+status);
          if (status) {
            this.setState({
              isLoading: false,
              isFetching: true,
              voted: true,
              votedItemIndex: index
            });

            this.fetchData();

          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChangeVote(index) {
    let item = this.state.participants[index];

    this.unvote(item, index)
      .then(() =>
        removeVotedItem().then(status => {
          if (status) {
            this.setState({
              voted: false,
              isLoading: false,
              isFetching: true,
              votedItemIndex: null
            });

            this.fetchData();
          }
        })
      )
      .catch(err => console.log(err));
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => (
    <ListItem
      containerStyle={styles.ItemContainerStyle}
      title={item.name}
      titleStyle={styles.titleStyle}
      subtitle="Votez pour cette équipe"
      leftAvatar={{ source: { uri: item.avatar } }}
      bottomDivider={true}
      onPress={() => this.handleVote(item, index)}
    />
  );

  render() {
    const { isLoading, voted, isFetching, participants } = this.state;

    if (isLoading) {
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>;
    } else if (voted) {
      return (
        <View style={styles.loading}>
          <Icon
            style={styles.checkIcon}
            name="check"
            type="evilicon"
            color={theme.COLORS.SUCCESS}
            size={72}
          />
          <Text style={styles.votedText}>Thank you for your vote!</Text>
          <Button
            title="Change vote?"
            type="outline"
            titleStyle={styles.buttonStyle}
            onPress={() => this.handleChangeVote(this.state.votedItemIndex)}
          />
        </View>
      );
    } else if (isFetching) {
      return (
        <View style={styles.loading}>
          <Icon
            name="spinner-3"
            type="evilicon"
            size={72}
            color={theme.COLORS.PRIMARY}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={participants}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#eeebd3",
    alignItems: "center",
    justifyContent: "center"
  },
  ItemContainerStyle: {
    backgroundColor: "#eeebd3"
  },
  container: {
    flex: 1,
    backgroundColor: "#eeebd3"
  },
  textStyle: {
    padding: 10,
    fontSize: 18
  },
  item: {
    padding: 10
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: "bold"
  },
  votedText: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 24
  },
  checkIcon: {
    paddingBottom: 40
  },
  buttonStyle: {
    color: theme.COLORS.BUTTON_COLOR
  }
});
