import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

export default function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [techs, setTechs] = useState('');
    
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
    }, []);

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);

    function setupWebSocket() {
        disconnect();

        const { latitude, longitude } = currentRegion;

        connect(
            latitude,
            longitude,
            techs
        );
        
    }

    async function loadDevs() {
        const { latitude, longitude } = currentRegion;

        const response = await api.get('/search', {
            params: {
                latitude,
                longitude,
                techs
            }
        });
        // TODO: MOSTRAR UM TOAST QUANDO NÃO ACHAR NENHUM DEV
        setDevs(response.data.devs);
        setupWebSocket();
    }

    async function centerMap() {
        console.log('chegou');
        
    }

    function handleRegionChanged(region){
        setCurrentRegion(region);
    }

    if(!currentRegion) {
        return (
            <View style={styles.contentTextLoad}>
                <Text style={styles.textLoad}>Carregando...</Text>
            </View>
        );
    }
    
    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegionChanged}
                initialRegion={currentRegion}
                style={styles.map}
            >
                {devs.map(dev => (
                    <Marker
                        key={dev._id}
                        coordinate={{
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0]
                        }}
                    >
                        <Image 
                            style={styles.avatar}
                            source={{
                                uri: dev.avatar_url
                            }}
                        />
                        <Callout onPress={() => {
                            navigation.navigate('Profile', {
                                github_username: dev.github_username
                            });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>
                                    {dev.name}
                                </Text>
                                <Text style={styles.devBio}>
                                    {dev.bio}
                                </Text>
                                <Text style={styles.devTechs}>
                                    {dev.techs.join(', ')}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.searchForm}>
                <TextInput 
                    style={styles.searchInput}
                    placeholder="Buscar devs por techs..."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    returnKeyType="search"
                    value={techs}
                    onChangeText={setTechs}
                />

                {/* TODO: FAZER O AJUSTE DO FORM COM O TECLADO ABERTO */}
                <TouchableOpacity onPress={loadDevs} style={styles.loadButton}>
                    <MaterialIcons name="my-location" size={22} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* <View style={styles.homeButtonContent}>
                <TouchableOpacity onPress={centerMap} style={styles.homeButton}>
                    <Text style={styles.homeButtonText}>
                        WaDev
                    </Text>
                </TouchableOpacity>
            </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 50,
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
    },

    callout: {
        width: 260,
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },

    devBio: {
        color: '#666',
        marginTop: 5,
    },

    devTechs: {
        marginTop: 5,
        textTransform: 'capitalize'
    },

    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2,
    }, 

    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#8E4DFF",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },

    // homeButtonContent: {
    //     position: 'absolute',
    //     bottom: 20,
    //     left: 20,
    //     right: 20,
    //     zIndex: 5,
    //     flexDirection: 'row'
    // },

    // homeButton: {
    //     width: 80,
    //     height: 40,
    //     backgroundColor: "#8E4DFF",
    //     borderRadius: 25,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginLeft: 15,
    // },

    // homeButtonText: {
    //     fontSize: 17,
    //     fontWeight: '700',
    //     color: '#fff'
    // },
})
