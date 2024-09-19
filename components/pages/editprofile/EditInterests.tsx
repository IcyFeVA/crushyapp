import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { defaultStyles } from "@/constants/Styles";
import Spacer from "@/components/Spacer";
import InterestSelector from "@/components/profile/InterestSelector";

const EditInterests = () => {
  return (
    <SafeAreaView style={defaultStyles.SafeAreaView}>
      <View style={defaultStyles.innerContainer}>
        <View style={defaultStyles.pageHeader}>
          <Text style={defaultStyles.pageTitle}>Edit Interests</Text>
        </View>
        <Spacer height={24} />
        <View style={{ paddingHorizontal: 8, flex: 1 }}>
          <InterestSelector />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditInterests;
