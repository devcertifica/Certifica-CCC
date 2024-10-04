import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

type ImagePickerResponse = {
  uri: string;
  fileName: string | undefined;
};

const ImagePickerComponent = (p0: {
  onImageSelect: (imageData: any) => void;
}) => {
  const [image, setImage] = useState<ImagePickerResponse | null>(null);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        selectionLimit: 1,
        includeBase64: false,
      },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorCode) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedImage = response.assets[0];
          setImage({
            uri: selectedImage.uri ?? "",
            fileName: selectedImage.fileName,
          });
        }
      }
    );
  };

  return (
    <View>
      <Text>ImagePickerComponent</Text>

      <Button title="Pick Image" onPress={() => pickImage()}></Button>

      {image ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Text>{image.fileName}</Text>
        </View>
      ) : (
        <Text>No Image Selected</Text>
      )}
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});
