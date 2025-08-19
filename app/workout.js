// app/workout.js
import React, { useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import EKGChart from "../components/EKGChart";

// ✅ Local reference video
import sampleVideo from "../assets/videos/sample.mp4";

export default function WorkoutScreen() {
  const [userVideo, setUserVideo] = useState(null);

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
    });

    if (!result.canceled) {
      setUserVideo(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Videos row */}
      <View style={styles.videoRow}>
        {/* Correct form video */}
        <Video
          source={sampleVideo}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />

        {/* User video (upload or fallback) */}
        <View style={styles.video}>
          {userVideo ? (
            <Video
              source={{ uri: userVideo }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              isLooping
              style={{ flex: 1 }}
            />
          ) : (
            <Button title="Upload Your Video" onPress={pickVideo} />
          )}
        </View>
      </View>

      {/* EKG tracker */}
      <View style={styles.ekgContainer}>
        <EKGChart />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
  },
  videoRow: {
    flex: 3,
    flexDirection: "row",
  },
  video: {
    flex: 1,
    margin: 2,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
  ekgContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});
