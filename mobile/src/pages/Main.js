import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function Main() {
    const [currentRegion, setCurrentRegion] = useState(null);
    
    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.4,
                    longitudeDelta: 0.4,
                })
            }
        }

        loadInitialPosition();
    }, [])

    if(!currentRegion) {
        return <View style={styles.contentTextLoad}>
            <Text style={styles.textLoad}>Carregando...</Text>
        </View>;
    }
    
    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{latitude: -23.5461245, longitude: -46.9242142}} >
                <Image style={styles.avatar} source={{uri: 'https://avatars0.githubusercontent.com/u/26979210?s=460&v=4'}} />
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },

    contentTextLoad:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textLoad: {
        fontSize: 18,
        fontWeight: '900',
    }
})
