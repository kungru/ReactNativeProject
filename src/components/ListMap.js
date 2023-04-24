import {Image, StyleSheet, Text, TouchableOpacity, View,FlatList} from 'react-native';
import React from 'react';

const FlastList = props => {
  const {name, location, picture, km, thumbnail} = props;
  const getThumbail = uri => {
    if (uri) return {uri};
    return require('../assets/logo.png');
  };
  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        marginHorizontal: 15,
        padding: 5,
        borderColor: '#ccc',
        elevation: 1,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 0.3}}>
          <Image
            source={getThumbail(thumbnail.url)}
            style={{width: '100%', height: 80, resizeMode: 'center'}}
          />
        </View>
        <View style={{flex: 0.7, justifyContent: 'space-between'}}>
          <Text style={{fontSize: 24, fontWeight: 'bold',color:'black'}}>{name}</Text>
          <Text style={{color:'black'}}>{location}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View
              style={{flexDirection: 'row', gap: 4, alignItems: 'flex-end'}}>
              <Text style={{fontWeight: '500', fontSize: 16,color:'black'}}>{picture}</Text>
              <Text style={{color:'black'}}>picture</Text>
            </View>
            <View
              style={{flexDirection: 'row', gap: 4, alignItems: 'flex-end'}}>
              <Text style={{fontWeight: '500', fontSize: 16,color:'black'}}>~{km}</Text>
              <Text style={{color:'black'}}>km</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FlastList;

const styles = StyleSheet.create({});
