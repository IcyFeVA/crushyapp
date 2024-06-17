import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert, Image, Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from './ui/Buttons'
import Spacer from './Spacer'
import { defaultStyles } from '@/constants/Styles'
import { Colors } from '@/constants/Colors'

interface Props {
    size: number | string
    url: string | null
    onUpload: (filePath: string) => void
}

export default function Avatar({ url, size = 70, onUpload }: Props) {
    const [uploading, setUploading] = useState(false)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const avatarSize = { width: size + '%' }

    useEffect(() => {
        if (url) downloadImage(url)
    }, [url])

    async function downloadImage(path: string) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path)

            if (error) {
                throw error
            }

            const fr = new FileReader()
            fr.readAsDataURL(data)
            fr.onload = () => {
                setAvatarUrl(fr.result as string)
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log('Error downloading image: ', error.message)
            }
        }
    }

    async function uploadAvatar() {
        try {
            setUploading(true)

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Restrict to only images
                allowsMultipleSelection: false, // Can only select one image
                allowsEditing: true, // Allows the user to crop / rotate their photo before uploading it
                quality: 1,
                exif: false, // We don't want nor need that data.
            })

            if (result.canceled || !result.assets || result.assets.length === 0) {
                console.log('User cancelled image picker.')
                return
            }

            const image = result.assets[0]
            console.log('Got image', image)

            if (!image.uri) {
                throw new Error('No image uri!') // Realistically, this should never happen, but just in case...
            }

            const arraybuffer = await fetch(image.uri).then((res) => res.arrayBuffer())

            const fileExt = image.uri?.split('.').pop()?.toLowerCase() ?? 'jpeg'
            const path = `${Date.now()}.${fileExt}`
            const { data, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(path, arraybuffer, {
                    contentType: image.mimeType ?? 'image/jpeg',
                })

            if (uploadError) {
                throw uploadError
            }

            onUpload(data.path)
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            } else {
                throw error
            }
        } finally {
            setUploading(false)
        }
    }

    return (
        <View>
            <Spacer height={24} />

            <SecondaryButton onPress={uploadAvatar}>
                <SecondaryButtonText>{uploading ? 'Uploading ...' : 'Upload'}</SecondaryButtonText>
            </SecondaryButton>

            <Spacer height={24} />

            {avatarUrl ? (
                <Image
                    source={{ uri: avatarUrl }}
                    accessibilityLabel="Avatar"
                    style={[avatarSize, styles.avatar, styles.image]}
                />
                // <Image
                //     source={{ uri: avatarUrl }}
                //     accessibilityLabel="Avatar"
                //     style={[avatarSize, styles.avatar, styles.image]}
                // />
            ) : (
                // No image
                <Spacer height={0} />
                // <View className='w-full h-3/4' style={[styles.avatar, styles.noImage]} />
                // <View style={[avatarSize, styles.avatar, styles.noImage]} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 16,
        overflow: 'hidden',
        maxWidth: '100%',
        aspectRatio: 2 / 3,
    },
    image: {
        objectFit: 'cover',
        paddingTop: 0,
        marginHorizontal: 'auto'
    },
    noImage: {
        backgroundColor: Colors.light.backgroundSecondary,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgb(200, 200, 200)',
        borderRadius: 16,
    },
})