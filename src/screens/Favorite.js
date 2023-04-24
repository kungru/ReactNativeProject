import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, {Marker} from 'react-native-maps';
import {PROVIDER_GOOGLE} from 'react-native-maps/lib/ProviderConstants';
// import Icon from 'react-native-vector-icons/dist/Ionicons';
import Geocoder from 'react-native-geocoding';
import ListMap from '../components/ListMap';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton'
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';

import FormData from 'form-data';

const Favorite = () => {
  const mapRef = useRef();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalPlus, setModalPlus] = useState(false);

  const [titlePlus, setTitlePlus] = useState();
  const [locationPlus, setLocationPlus] = useState();
  const [imagePlus, setImagePlus] = useState();

  const [marker, setMarker] = useState({
    latitude: 21.022392,
    longitude: 105.824448,
  });
  const [address, setAddress] = useState();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModalPlus = () => {
    setImagePlus(undefined);
    setLocationPlus(undefined);
    setTitlePlus(undefined);
    setModalPlus(!isModalPlus);
  };

  Geocoder.init('AIzaSyBEaXgEpQZUiExityBFr_MNJJAIco57msk');

  const [dataMap, setDataMap] = useState([]);
  useEffect(() => {
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://192.168.1.227:4000/maps',
      headers: {},
    };

    axios(config)
      .then(function (response) {
        setDataMap(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    Geocoder.from(marker.latitude, marker.longitude).then(data => {
      let fetchedAddress = data.results[0].formatted_address;
      setAddress(fetchedAddress);
    });
  }, [marker]);

  const option = {
    title: 'Select Image',
    type: 'libary',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    },
  };
  const openGallery = async () => {
    const result = await launchImageLibrary(option);

    setImagePlus(result.assets[0]);
  };
  console.log(imagePlus);
  const getThumbail = uri => {
    if (uri) return {uri};
    return require('../assets/logo.png');
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Open map" onPress={toggleModal} style={{}} />

      <View>
        {dataMap.length > 0 ? (
          <ScrollView>
            {dataMap.map(item => (
              <TouchableOpacity onPress={toggleModal}>
                <ListMap
                  name={item.title}
                  location={item.location}
                  picture={item.picture}
                  km={item.km}
                  thumbnail={item.thumbnail}
                  latitude={item.latitude}
                  longitude={item.longitude}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        ) : (
          <Text>Data Loading</Text>
        )}
      </View>

      {/* <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          padding: 8,
          backgroundColor: 'red',
          borderRadius: 100,
        }}
        >
        <Icon name="add-outline" size={30} color={'white'} />
      </TouchableOpacity> */}

      <Icon
    name="plus-circle"
    style={{
      color:'#560CCE',
      position:'absolute',
      right:15,
      top:650,
      bottom:0,
      fontSize:50,
      zIndex:10,
    }}
    onPress={toggleModalPlus}

  >
  </Icon>


  <Text style={{
            width:28,position:'absolute',backgroundColor:'#eeeeee',
            height:30,
            right:20,
            top:660,
            bottom:0,
            zIndex:9,
        }} ></Text>
      {/* <View>{list()}</View> */}
      <Modal visible={isModalVisible} style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <MapView
            ref={mapRef}
            zoomControlEnabled={true}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: marker.latitude,
              longitude: marker.longitude,
              latitudeDelta: 0.021,
              longitudeDelta: 0.021,
            }}
            onPress={e => setMarker(e.nativeEvent.coordinate)}>
            {marker !== undefined ? <Marker coordinate={marker} /> : null}
          </MapView>
          <View
            style={{
              padding: 15,
              backgroundColor: 'white',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 12,
            
              }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                {/* <BackButton onPress={() => setModalVisible(false)} position={'absolute'} left={0}/> */}
                <Icon name="arrow-left" size={30} color={'black'} />
              </TouchableOpacity>
              
              <View>
                <Text style={{color: 'black', fontSize: 24}}>Ha Noi</Text>
                <Text style={{marginRight: 30, color: 'black', fontSize: 14}}>
                  {address}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={isModalPlus} style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View
            style={{
              padding: 15,
              backgroundColor: 'white',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 12,
                position:'relative'
              }}>
              <TouchableOpacity onPress={() => setModalPlus(false)}>
            
              {/* <BackButton/> */}
                <Icon name="arrow-left" size={30} color={'black'} position={'absolute'} top={30} left={10} zIndex={20}/>
              </TouchableOpacity>
              <View >
                <Text style={{color: 'black', fontSize: 24,position:'absolute',left:35,top:30}}>Back</Text>
                
                <Text style={{height:40}}></Text>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 15,
              backgroundColor: 'white',
              marginVertical: 2,
              marginHorizontal: 10,
            }}>
            <TextInput
              label="Address"
              returnKeyType="done"
              value={titlePlus}
              onChangeText={text => setTitlePlus(text)}
            />
            <TextInput
              label="Name"
              returnKeyType="done"
              value={locationPlus}
              onChangeText={text => setLocationPlus(text)}
            />
            <Button title="Add image" onPress={openGallery} />
            {imagePlus !== undefined ? (
              <View style={{marginVertical: 10}}>
                <Image
                  source={getThumbail(imagePlus.uri)}
                  style={{width: '100%', height: 100, resizeMode: 'center'}}
                />
              </View>
            ) : null}

            <TouchableOpacity
              style={{
                padding: 15,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>Add Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

