import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const jobList = [
    { id: '1', title: 'Plumber', icon: 'plumbing' },
    { id: '2', title: 'Painter', icon: 'brush' },
    { id: '3', title: 'Caretaker', icon: 'supervised-user-circle' },
    { id: '4', title: 'Security', icon: 'maps-home-work' },
    { id: '5', title: 'Electrician', icon: 'electric-moped' },
    { id: '6', title: 'Cook', icon: 'restaurant' },
    { id: '7', title: 'House Cleaner', icon: 'cleaning-services' },
    { id: '8', title: 'Car Driver', icon: 'directions-car' },
];

const JobCard = ({ title, icon }) => {
    const router = useRouter();

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: 'Pages/jobList', params: { jobTitle: title } })}
        >
            <View style={styles.cardContent}>
                <Icon name={icon} size={30} color="#000" style={styles.icon} />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Explore = () => {
    const renderJobCard = ({ item }) => {
        return (
            <JobCard
                title={item.title}
                icon={item.icon}
            />
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.header}>Explore Jobs</Text>
            <FlatList
                data={jobList}
                renderItem={renderJobCard}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
    },
    list: {
        marginTop: 10,
    },
    card: {
        backgroundColor: '#f8f8f8',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Explore;
