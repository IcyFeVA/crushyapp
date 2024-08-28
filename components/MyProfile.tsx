import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Avatar from "@/components/Avatar";
import Spacer from "@/components/Spacer";

export default function MyProfile() {
  const session = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (session?.user) getProfile();
  }, [session]);

  async function getProfile() {
    // Fetch profile data (similar to Me.tsx)
  }

  async function updateProfile() {
    // Update profile data
  }

  return (
    <SafeAreaView style={defaultStyles.SafeAreaView}>
      <View style={defaultStyles.innerContainer}>
        <View style={defaultStyles.pageHeader}>
          <Text style={defaultStyles.pageTitle}>My Profile</Text>
        </View>

        <Avatar
          size={100}
          url={profile.avatar_url}
          onUpload={(url) => {
            setProfile((prev) => ({ ...prev, avatar_url: url }));
            updateProfile();
          }}
        />

        <Spacer height={24} />

        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) =>
            setProfile((prev) => ({ ...prev, name: text }))
          }
          placeholder="Name"
        />

        <Spacer height={16} />

        <TextInput
          style={styles.input}
          value={profile.age}
          onChangeText={(text) =>
            setProfile((prev) => ({ ...prev, age: text }))
          }
          placeholder="Age"
          keyboardType="numeric"
        />

        <Spacer height={24} />

        <Pressable
          style={[defaultStyles.button, defaultStyles.buttonShadow]}
          onPress={updateProfile}
        >
          <Text style={defaultStyles.buttonLabel}>Save Changes</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tertiary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});
