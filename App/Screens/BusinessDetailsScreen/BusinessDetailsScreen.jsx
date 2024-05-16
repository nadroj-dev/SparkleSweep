import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  FlatList,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import BusinessPhotos from './BusinessPhotos';
import BusinessAboutMe from './BusinessAboutMe';
import BookingModal from './BookingModal';

export default function BusinessDetailsScreen() {
  const param = useRoute().params;
  const [business, setBusiness] = useState(param?.business);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const onMessageBtnClick = () => {
    Linking.openURL(
      'mailto:' +
        business?.email +
        '?subject=I am looking for your Service&body=Hi There,'
    );
  };

  const renderItem = ({ item }) => {
    if (item === 'header') {
      return (
        <>
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={30} color="black" />
          </TouchableOpacity>
          <Image
            source={{ uri: business.images[0]?.url }}
            style={{ width: '100%', height: 300 }}
          />
          <View style={styles.infoContainer}>
            <Text style={{ fontFamily: 'outfit-bold', fontSize: 25 }}>
              {business.name}
            </Text>
            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: 'outfit-medium',
                  color: Colors.PRIMARY,
                  fontSize: 20,
                }}>
                {business.contactPerson} 🌟{' '}
              </Text>
              <Text
                style={{
                  color: Colors.PRIMARY,
                  backgroundColor: Colors.PRIMARY_LIGHT,
                  padding: 6,
                  borderRadius: 6,
                  fontSize: 14,
                }}>
                {business.category?.name}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'outfit',
                color: Colors.GRAY,
              }}>
              <Ionicons
                name="location-sharp"
                size={25}
                color={Colors.PRIMARY}
              />{' '}
              {business.address}
            </Text>
            {renderSeparator()}
            {/* About Me */}
            <BusinessAboutMe business={business} />
            {renderSeparator()}
            <BusinessPhotos business={business} />
          </View>
        </>
      );
    }
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          borderWidth: 0.4,
          borderColor: Colors.GRAY,
          marginTop: 20,
          marginBottom: 20,
        }}
      />
    );
  };

  return business ? (
    <View style={{ flex: 1 }}>
      <FlatList
        data={['header']}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      {/* Message and Booking Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.messagebtn} onPress={onMessageBtnClick}>
          <Text style={styles.buttonText1}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookingBtn}
          onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText2}>Book Now</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Screen Modal */}
      <Modal animationType="slide" visible={showModal}>
        <BookingModal
          businessId={business.id}
          hideModal={() => setShowModal(false)}
        />
      </Modal>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: 'absolute',
    zIndex: 10,
    paddingTop: 35,
    paddingLeft: 15,
  },
  infoContainer: {
    padding: 20,
    display: 'flex',
    gap: 7,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  messagebtn: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
    marginRight: 5,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 99,
    flex: 1,
    marginLeft: 5,
  },
  buttonText1: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: Colors.PRIMARY,
  },
  buttonText2: {
    textAlign: 'center',
    fontFamily: 'outfit-medium',
    fontSize: 18,
    color: Colors.WHITE,
  },
  buttonContainer: {
    flexDirection: 'row',
    margin: 10,
  },
});
