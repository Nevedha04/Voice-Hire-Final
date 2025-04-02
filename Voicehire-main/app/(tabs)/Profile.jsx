import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useAuth, useUser } from "@clerk/clerk-expo";



const Profile = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { user, isLoaded } = useUser();
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (isLoaded && user) {
      setFirstName(user.firstName || '');
      setUsername(user.username || '');
      setImage(user.imageUrl || null);
    }
  }, [isLoaded, user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if(user){
      try {
        await user.update({username:username,firstName:firstName})
    
        alert("Profile updated successfully!");
      } catch (error) {
        alert("Error updating profile: " + error.message);
      }
    }
  };
  
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imageButtonText}>Select Profile Image</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.label}>First Name</Text>
        <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="Enter first name" />

        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} value={username} onChangeText={setUsername} placeholder="Enter username" />

        <Button title="Submit" onPress={handleSubmit} />

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Pages/createEmployee')} style={styles.button}>
            <Text style={styles.buttonText}>Go to Create Employee</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity onPress={() => { signOut(); navigation.navigate('LoginScreen'); }} style={styles.signOutButton}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  imageButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    textAlign: 'center',
    color: '#666',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#d9534f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Profile;
