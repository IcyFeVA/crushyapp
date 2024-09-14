import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Avatar from "@/components/Avatar";
import Spacer from "@/components/Spacer";

const PROFILE_SECTIONS = [
  { title: "Bio", navigateTo: "EditBio" },
  { title: "Height", navigateTo: "EditHeight" },
  { title: "Body Type", navigateTo: "EditBodyType" },
  { title: "Exercise Frequency", navigateTo: "EditExerciseFrequency" },
  { title: "Smoking Status", navigateTo: "EditSmokingStatus" },
  { title: "Drinking Status", navigateTo: "EditDrinkingStatus" },
  { title: "Cannabis Use", navigateTo: "EditCannabisUse" },
  { title: "Diet Preference", navigateTo: "EditDietPreference" },
  { title: "Education Level", navigateTo: "EditEducationLevel" },
  { title: "Occupation", navigateTo: "EditOccupation" },
  { title: "Relationship Status", navigateTo: "EditRelationshipStatus" },
  { title: "Relationship Type", navigateTo: "EditRelationshipType" },
  { title: "Children", navigateTo: "EditChildren" },
  { title: "Pets", navigateTo: "EditPets" },
  { title: "Languages", navigateTo: "EditLanguages" },
  { title: "Religion", navigateTo: "EditReligion" },
  { title: "Political Views", navigateTo: "EditPoliticalViews" },
  { title: "Zodiac Sign", navigateTo: "EditZodiacSign" },
];

const MyProfile = () => {
  const session = useAuth();
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    age: "",
    avatar_url: "",
  });

  useEffect(() => {
    if (session?.user) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      if (!session?.user) {
        throw new Error("No user in the session!");
      }

      const { data, error } = await supabase
        .from("profiles_test")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setProfile({
          name: data.name || "",
          age: data.age ? data.age.toString() : "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      // Optionally, implement user-facing error handling here
    } finally {
      setLoading(false);
    }
  }, [session]);

  const handleUpdateProfile = useCallback(async () => {
    setLoading(true);
    try {
      if (!session?.user) {
        throw new Error("No user in the session!");
      }

      const updates: ProfileUpdate = {
        id: session.user.id,
        name: profile.name,
        age: parseInt(profile.age, 10),
        avatar_url: profile.avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles_test").upsert(updates);

      if (error) {
        throw error;
      }

      // Optionally, provide user feedback upon successful update
    } catch (error) {
      console.error("Error updating profile:", error);
      // Optionally, implement user-facing error handling here
    } finally {
      setLoading(false);
    }
  }, [session, profile]);

  const handleAvatarUpload = useCallback(
    (url: string) => {
      setProfile((prev) => ({ ...prev, avatar_url: url }));
      handleUpdateProfile();
    },
    [handleUpdateProfile]
  );

  const handleInputChange = useCallback(
    (field: keyof Profile, value: string) => {
      setProfile((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const renderSectionButton = (title: string, navigateTo: string) => (
    <Pressable
      key={title}
      style={styles.sectionButton}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Text style={styles.sectionButtonText}>{title}</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <SafeAreaView style={defaultStyles.SafeAreaView}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={defaultStyles.SafeAreaView}>
      <ScrollView style={defaultStyles.innerContainer}>
        <View style={defaultStyles.pageHeader}>
          <Text style={defaultStyles.pageTitle}>Edit Profile</Text>
        </View>

        <View style={styles.avatarContainer}>
          <Avatar
            size={100}
            url={profile.avatar_url}
            onUpload={handleAvatarUpload}
          />
        </View>

        <Spacer height={24} />

        <TextInput
          style={styles.input}
          value={profile.name}
          onChangeText={(text) => handleInputChange("name", text)}
          placeholder="Name"
          placeholderTextColor={Colors.light.tertiary}
        />

        <Spacer height={16} />

        <TextInput
          style={styles.input}
          value={profile.age}
          onChangeText={(text) => handleInputChange("age", text)}
          placeholder="Age"
          keyboardType="numeric"
          placeholderTextColor={Colors.light.tertiary}
        />

        <Spacer height={24} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
          {PROFILE_SECTIONS.map(({ title, navigateTo }) =>
            renderSectionButton(title, navigateTo)
          )}
        </View>

        <Spacer height={24} />

        <Pressable
          style={[defaultStyles.button, defaultStyles.buttonShadow]}
          onPress={handleUpdateProfile}
        >
          <Text style={defaultStyles.buttonLabel}>Save Changes</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyProfile;

// Type Definitions
interface Profile {
  name: string;
  age: string;
  avatar_url: string;
}

interface ProfileUpdate {
  id: string;
  name: string;
  age: number;
  avatar_url: string;
  updated_at: Date;
}

// Styles
const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.tertiary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: Colors.light.text,
  },
  section: {
    backgroundColor: Colors.light.white,
    borderRadius: 8,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "BodyBold",
    color: Colors.light.text,
    marginBottom: 8,
  },
  sectionButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tertiary,
  },
  sectionButtonText: {
    fontSize: 16,
    fontFamily: "BodyRegular",
    color: Colors.light.text,
  },
});
