import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import {
  RichEditor,
  RichToolbar,
  actions,
} from "react-native-pell-rich-editor";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

const EditBio = () => {
  const session = useAuth();
  const navigation = useNavigation();
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const richText = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    const fetchBio = async () => {
      try {
        if (!session?.user) return;

        setLoading(true);

        const { data, error } = await supabase
          .from("profile_details") // Make sure this matches your table name
          .select("bio")
          .eq("id", session.user.id)
          .single();

        if (error) throw error;

        if (data && data.bio) {
          setBio(data.bio);
          richText.current?.setContentHTML(data.bio);
        }
      } catch (error) {
        console.error("Error fetching bio:", error);
        Alert.alert("Error", "Failed to load bio");
      } finally {
        setLoading(false);
      }
    };

    fetchBio();
  }, [session]);

  const handleSave = useCallback(async () => {
    try {
      if (!session?.user) return;

      const { error } = await supabase
        .from("profile_details")
        .update({ bio: bio })
        .eq("id", session.user.id);

      if (error) throw error;

      console.log("Your bio has been updated.");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating bio:", error);
      Alert.alert("Error", "Failed to update bio");
    }
  }, [session, bio, navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.pageHeader}>
            <Text style={defaultStyles.pageTitle}>Edit Bio</Text>
          </View>

          <RichToolbar
            editor={richText}
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.heading2,
              actions.heading3,
            ]}
            iconMap={{
              [actions.heading2]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>XL</Text>
              ),
              [actions.heading3]: ({ tintColor }) => (
                <Text style={[styles.tib, { color: tintColor }]}>L</Text>
              ),
            }}
          />

          <RichEditor
            ref={richText}
            onChange={setBio}
            placeholder="Write your bio here..."
            style={styles.richEditor}
            initialHeight={200}
            scrollEnabled={false}
            onCursorPosition={(scrollY) => {
              scrollRef.current?.scrollTo({ y: scrollY - 30, animated: true });
            }}
          />

          <Button
            onPress={handleSave}
            style={[defaultStyles.button, defaultStyles.buttonShadow]}
            disabled={loading}
          >
            <Text style={defaultStyles.buttonLabel}>
              {loading ? "Updating ..." : "Update Bio"}
            </Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  pageHeader: {
    marginBottom: 20,
  },
  richEditor: {
    minHeight: 200,
    flex: 1,
    backgroundColor: Colors.light.secondary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  tib: {
    textAlign: "center",
    color: Colors.light.text,
    fontSize: 16,
    fontFamily: "BodyBold",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: Colors.light.primary,
  },
});

export default EditBio;
