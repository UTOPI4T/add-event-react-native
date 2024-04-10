// MainPage.js (All the Inputs)
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, 
        Text, 
        StyleSheet, 
        View, Image, 
        Button, 
        TextInput, 
        KeyboardAvoidingView, 
        Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MainPage = ({ route }) => {
  
  const navigation = useNavigation();
  const goToSecondPage = () => {
    navigation.navigate('WSecondPage', { events });
  };

  // All the useState needed
  const [events, setEvents] = useState(route.params ? route.params.events : []);
  const [event, setEvent] = useState({
    imageSource: null,
    eventName: '',
    location: '',
    dateTime: ''
  });
  const addEvent = () => {
    setEvents([...events, event]);
    setEvent({
      imageSource: null,
      eventName: '',
      location: '',
      dateTime: ''
    });
  };
  
  useEffect(() => {
    if (route.params && route.params.events) {
      setEvents(route.params.events);
    }
  }, [route.params]);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 5],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      const selectedImage = pickerResult.assets[0].uri;
      setEvent({ ...event, imageSource: selectedImage });
      console.log('Image uploaded for box:', selectedImage);
    }
  };

  return (
    <View style={styles.addImages}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={selectImage}>
          {event.imageSource ? (
            <Image
              source={{ uri: event.imageSource }}
              style={styles.image}
              resizeMode="contain"
            />
          ) : (
            <Ionicons
              name="add-circle-outline"
              size={35}
              color="black"
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 8 }}>
        <Text style={{ fontWeight: 'bold' }}>
          {event.imageSource ? 'Tap again to edit ' : 'Add Image'} // Condition while selecting an image
        </Text>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} // Adjust the offset as needed
        >
          <TextInput
            style={styles.input}
            placeholder="Event Name"
            onChangeText={text => setEvent({ ...event, eventName: text })}
            value={event.eventName}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={text => setEvent({ ...event, location: text })}
            value={event.location}
          />
          <TextInput
            style={styles.input}
            placeholder="Date and Time"
            onChangeText={text => setEvent({ ...event, dateTime: text })}
            value={event.dateTime}
          />
        </KeyboardAvoidingView>
        <Button
          title="Add Event"
          onPress={addEvent}
          color='green'
        />
        <Button
          title="Next Page"
          onPress={goToSecondPage} // Navigate to SecondPage.js
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addImages: {
    marginTop: 100,
    padding: 70,
    margin: 5,
  },
  image: {
    borderRadius: 5,
    width: 370,
    height: 210,
  },
  input: {
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default MainPage;
