import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import Avatar from "@/components/Avatar";
import Spacer from "@/components/Spacer";
import { useNavigation } from "@react-navigation/native";

export default function MyProfile() {
  const session = useAuth();
  const navigation = useNavigation();
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
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error } = await supabase
        .from("profiles_test")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile({
          name: data.name || "",
          age: data.age ? data.age.toString() : "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session.user.id,
        name: profile.name,
        age: parseInt(profile.age),
        avatar_url: profile.avatar_url,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles_test").upsert(updates);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  const renderSectionButton = (title: string, onPress: () => void) => (
    <Pressable style={styles.sectionButton} onPress={onPress}>
      <Text style={styles.sectionButtonText}>{title}</Text>
    </Pressable>
  );

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
            onUpload={(url) => {
              setProfile((prev) => ({ ...prev, avatar_url: url }));
              updateProfile();
            }}
          />
        </View>

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
          {renderSectionButton("Bio", () => navigation.navigate("EditBio"))}
          {renderSectionButton("Height", () =>
            navigation.navigate("EditHeight")
          )}
          {renderSectionButton("Body Type", () =>
            navigation.navigate("EditBodyType")
          )}
          {renderSectionButton("Exercise Frequency", () =>
            navigation.navigate("EditExerciseFrequency")
          )}
          {renderSectionButton("Smoking Status", () =>
            navigation.navigate("EditSmokingStatus")
          )}
          {renderSectionButton("Drinking Status", () =>
            navigation.navigate("EditDrinkingStatus")
          )}
          {renderSectionButton("Cannabis Use", () =>
            navigation.navigate("EditCannabisUse")
          )}
          {renderSectionButton("Diet Preference", () =>
            navigation.navigate("EditDietPreference")
          )}
          {renderSectionButton("Education Level", () =>
            navigation.navigate("EditEducationLevel")
          )}
          {renderSectionButton("Occupation", () =>
            navigation.navigate("EditOccupation")
          )}
          {renderSectionButton("Relationship Status", () =>
            navigation.navigate("EditRelationshipStatus")
          )}
          {renderSectionButton("Relationship Type", () =>
            navigation.navigate("EditRelationshipType")
          )}
          {renderSectionButton("Children", () =>
            navigation.navigate("EditChildren")
          )}
          {renderSectionButton("Pets", () => navigation.navigate("EditPets"))}
          {renderSectionButton("Languages", () =>
            navigation.navigate("EditLanguages")
          )}
          {renderSectionButton("Religion", () =>
            navigation.navigate("EditReligion")
          )}
          {renderSectionButton("Political Views", () =>
            navigation.navigate("EditPoliticalViews")
          )}
          {renderSectionButton("Zodiac Sign", () =>
            navigation.navigate("EditZodiacSign")
          )}
        </View>

        <Spacer height={24} />

        <Pressable
          style={[defaultStyles.button, defaultStyles.buttonShadow]}
          onPress={updateProfile}
        >
          <Text style={defaultStyles.buttonLabel}>Save Changes</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

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
