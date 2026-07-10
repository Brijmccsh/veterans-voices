import * as ImagePicker from 'expo-image-picker';

/** Launch the photo library and return a single image URI, or null if cancelled. */
export async function pickImage(): Promise<string | null> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 0.85,
  });
  if (res.canceled || !res.assets?.length) return null;
  return res.assets[0].uri;
}

/** Launch the library to pick a single video; returns its URI or null. */
export async function pickVideo(): Promise<string | null> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!perm.granted) return null;
  const res = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['videos'],
  });
  if (res.canceled || !res.assets?.length) return null;
  return res.assets[0].uri;
}
