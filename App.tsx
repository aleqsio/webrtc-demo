import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from "react-native-webrtc";
import TrackPlayer from "react-native-track-player";


export default function App() {
  useEffect(()=> {
    TrackPlayer.setupPlayer().then(async () => {
    try {
      const track3 = {
        id: "ice_age",
        url: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3", // Load media from the file system
        title: "Ice Age",
        artist: "deadmau5",
        duration:500
      };

      // Add the tracks to the queue:
      await TrackPlayer.add([track3]);
      TrackPlayer.play();
    } catch (error) {
      console.error(error)
    }
    const state = await TrackPlayer.getState();
    if (state === TrackPlayer.STATE_PLAYING) {
      console.log("The player is playing");
    }

    const trackId = await TrackPlayer.getCurrentTrack();
    const trackObject = await TrackPlayer.getTrack(trackId);
    console.log(`Title: ${trackObject.title}`);

    const position = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    console.log(`${duration - position} seconds left.`);
    });
  })
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <RTCView streamURL={this.state.stream.toURL()} /> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
