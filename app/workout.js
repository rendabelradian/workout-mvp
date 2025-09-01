import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Platform } from "react-native";
import { Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import EKGChart from "../components/EKGChart";

// ✅ fallback video
import sampleVideo from "../assets/videos/sample.mp4";

// Map keys to actual assets
import pushups from "../assets/videos/strength/pushups.mp4";
import squats from "../assets/videos/strength/squats.mp4";
import yoga from "../assets/videos/flexibility/yoga.mp4";
import stretch from "../assets/videos/flexibility/stretch.mp4";
import jumpingJacks from "../assets/videos/cardio/jumping-jacks.mp4";
import burpees from "../assets/videos/cardio/burpees.mp4";

const videoMap = {
  pushups,
  squats,
  yoga,
  stretch,
  "jumping-jacks": jumpingJacks,
  burpees,
};

export default function WorkoutScreen() {
  const { video, title } = useLocalSearchParams();
  const [userVideo, setUserVideo] = useState(null);

  const correctFormVideo = videoMap[video] || sampleVideo;

  const pickVideo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled && result.assets?.length > 0) {
      let uri = result.assets[0].uri;
      console.log("Picked video:", uri);

      // On web: base64 data URI
      if (Platform.OS === "web" && uri.startsWith("data:")) {
        setUserVideo(uri); // keep base64 for <video> tag
      } else {
        setUserVideo(uri); // native (iOS/Android) uses file://
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title ? `${title} Workout` : "Workout"}
      </Text>

      {/* Videos row */}
      <View style={styles.videoRow}>
        {/* Left: correct form video */}
        <Video
          source={correctFormVideo}
          style={styles.video}
          resizeMode="cover"
          shouldPlay
          isLooping
          useNativeControls
        />

        {/* Right: user uploaded video */}
        <View style={styles.video}>
          {userVideo ? (
            Platform.OS === "web" && userVideo.startsWith("data:") ? (
              // ✅ Web: fallback HTML5 video player
              <video
                src={userVideo}
                controls
                autoPlay
                loop
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              // ✅ Native: expo-av Video
              <Video
                source={{ uri: userVideo }}
                style={{ flex: 1 }}
                resizeMode="cover"
                shouldPlay
                isLooping
                useNativeControls
              />
            )
          ) : (
            <Button title="Upload Your Video" onPress={pickVideo} />
          )}
          {userVideo && (
            <Button title="Retake Upload" onPress={pickVideo} color="#E63946" />
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
  title: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 10,
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
