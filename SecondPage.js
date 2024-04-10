// SecondPage.js (Where the data is displayed)
// SecondPage.js
import React, { useState } from 'react';
import { View, 
        StyleSheet, 
        ScrollView, 
        Image, 
        Text, 
        TouchableOpacity,
        Alert } from 'react-native';

const SecondPage = ({ route, navigation }) => {
  const [events, setEvents] = useState(route.params.events);

  // A function to delete an event
  const deleteEvent = (index) => { 
  Alert.alert(
    'Confirm Deletion',
    'Are you sure you want to delete this event?',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          const updatedEvents = [...events];
          updatedEvents.splice(index, 1); // Remove the event at the specified index
          setEvents(updatedEvents);
          navigation.navigate('SelectPhoto', { events: updatedEvents }); // Navigate back to SelectPhoto.js with updated events
        },
        style: 'destructive',
      },
    ],
    { cancelable: true }
  );
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.map((event, index) => (
        <View key={index} style={styles.eventContainer}>
          {event.imageSource && (
            <Image
              source={{ uri: event.imageSource }}
              style={styles.image}
              resizeMode="cover" // use contain to get the exact size
            />
          )}
          <View style={styles.textContainer}>
            <Text style={styles.eventName}>{event.eventName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.location}> {event.location}</Text>
            </View>
            <Text style={styles.dTime}> {event.dateTime}</Text>
          </View>
          <TouchableOpacity onPress={() => deleteEvent(index)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#409030',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContainer: {
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    padding: 8,
    margin: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  image: {
    borderRadius: 2,
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6155e5',
    marginHorizontal: 3,
    marginVertical: 5,
  },
  location: {
    color: '#8279E2',
  },
  dTime: {
    margin: 2,
    color: '#8A82E2',
    fontSize: 13,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SecondPage;
