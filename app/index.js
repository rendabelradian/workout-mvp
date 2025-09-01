// app/index.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Video } from "expo-av";

// ✅ Import your sample videos
import pushups from "../assets/videos/strength/pushups.mp4";
import squats from "../assets/videos/strength/squats.mp4";
import yoga from "../assets/videos/flexibility/yoga.mp4";
import stretch from "../assets/videos/flexibility/stretch.mp4";
import jumpingJacks from "../assets/videos/cardio/jumping-jacks.mp4";
import burpees from "../assets/videos/cardio/burpees.mp4";

export default function HomeScreen() {
  const router = useRouter();
  const [expanded, setExpanded] = useState(null);

  // Dropdown data
  const categories = [
    {
      title: "Strength Training",
      key: "strength",
      videos: [
        { title: "Pushups", src: pushups },
        { title: "Squats", src: squats },
      ],
    },
    {
      title: "Flexibility Training",
      key: "flexibility",
      videos: [
        { title: "Yoga", src: yoga },
        { title: "Stretch", src: stretch },
      ],
    },
    {
      title: "Cardio",
      key: "cardio",
      videos: [
        { title: "Jumping Jacks", src: jumpingJacks },
        { title: "Burpees", src: burpees },
      ],
    },
  ];

  // Handle tap on a video → go to fullscreen workout page
  const handleVideoPress = (video, title) => {
    router.push({
      pathname: "/workout",
      params: { video, title }, // we’ll read this inside workout.js
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏋️ Workout MVP</Text>

      {categories.map((cat) => (
        <View key={cat.key} style={styles.dropdown}>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() =>
              setExpanded(expanded === cat.key ? null : cat.key)
            }
          >
            <Text style={styles.dropdownTitle}>{cat.title}</Text>
          </TouchableOpacity>

          {expanded === cat.key &&
            cat.videos.map((video, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.videoWrapper}
                onPress={() => handleVideoPress(video.src, video.title)}
              >
                <Video
                  source={video.src}
                  style={styles.video}
                  resizeMode="cover"
                  isLooping
                  shouldPlay
                  isMuted
                />
                <Text style={styles.videoLabel}>{video.title}</Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  dropdown: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#222",
    overflow: "hidden",
  },
  dropdownHeader: {
    padding: 16,
    backgroundColor: "#333",
  },
  dropdownTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  videoWrapper: {
    marginBottom: 12,
  },
  video: {
    width: "100%",
    height: 180,
    borderRadius: 8,
  },
  videoLabel: {
    color: "#fff",
    marginTop: 6,
    textAlign: "center",
  },
});
