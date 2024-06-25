import { Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Card, ListItem } from "react-native-ui-lib";
import Spacer from "./Spacer";
import { useEffect, useRef } from 'react';
import { Colors } from '@/constants/Colors';



export default function SurfButtomSheet({ open }) {

    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (open === true) {
            bottomSheetRef.current?.expand();
        }
    }, [open]);

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={['88%']}
            enablePanDownToClose={true}
            handleIndicatorStyle={{ backgroundColor: Colors.light.accent }}
            backgroundStyle={{ backgroundColor: Colors.light.backgroundSecondary }}
        >
            <BottomSheetScrollView contentContainerStyle={styles.bottomSheet}>

                <Card flex center onPress={() => console.log('pressed me')} enableShadow={false} style={{ backgroundColor: 'transparent' }}>
                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 20 }}>Search Filters (4)</Text>
                </Card>

                <Spacer height={24} />

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem, styles.firstItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Gender</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>Gender</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Age</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>30-40</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem, styles.lastItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Distance</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>60 km</Text>
                    </ListItem.Part>
                </ListItem>

                <Spacer height={32} />

                <Text style={{ fontFamily: 'BodyBold', fontSize: 14, lineHeight: 22, color: Colors.light.textSecondary, textAlign: 'center' }}>MORE ABOUT YOUR IDEAL MATCH</Text>

                <Spacer height={8} />

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem, styles.firstItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Interests</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>Basketball +2</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Has a bio</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Pronounce</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Sexual Orientation</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Starsign</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Accendant</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Some more here</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>And there</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Everywhere</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>All at</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

                <ListItem onPress={() => console.log('pressed')} style={[styles.bottomSheetListItem, styles.lastItem]}>
                    <ListItem.Part containerStyle={styles.bottomSheetListItemInner}>
                        <Text style={styles.listItemLabel}>Once</Text>
                        <Text style={[styles.listItemLabel, styles.active]}>-</Text>
                    </ListItem.Part>
                </ListItem>

            </BottomSheetScrollView>
        </BottomSheet>
    );
}


const styles = StyleSheet.create({
    bottomSheet: {
        padding: 16,
    },
    bottomSheetListItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.light.tertiary,
        borderWidth: 1,
        borderRadius: 0,
        borderTopWidth: 0,
        backgroundColor: Colors.light.background,
    },
    bottomSheetListItemInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemLabel: {
        fontFamily: 'BodySemiBold',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    firstItem: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopWidth: 1,

    },
    lastItem: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderTopWidth: 0,
    },
    active: {
        color: Colors.light.primary,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },


});
