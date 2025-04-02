import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView, TouchableOpacity, Linking ,Image} from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // To access the query params from URL
import axios from 'axios'; // Axios for API calls
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; // Import icons

const jobList = () => {
    
    const { jobTitle } = useLocalSearchParams(); // Get jobTitle from params
    const [jobDetails, setJobDetails] = useState([]); // Initialize state to hold the job details
    const [loading, setLoading] = useState(true); // To manage loading state

    // Fetch job details using Axios
    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                // Assuming jobTitle is passed as part of the URL path
                
                const response = await axios.get(`http://192.168.1.36:8080/api/employees/byJobDomain?jobDomain=${jobTitle}`);
                
                setJobDetails(response.data); // Set the job details in state
            } catch (error) {
                console.error("Error fetching job details:", error);
                Alert.alert("Error", "Failed to fetch job details.");
            } finally {
                setLoading(false); // Stop loading after the request
            }
        };
    
        fetchJobDetails();
    }, [jobTitle]);

    const handlePhonePress = (phoneNumber) => {
        Linking.openURL(`tel:${phoneNumber}`);
    };
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" /> // Show loading indicator while fetching
                ) : jobDetails.length > 0 ? (
                    jobDetails.map((job, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.title}>{job.name}</Text>
                            <View style={styles.row}><MaterialIcons name="work" size={20} color="black" /><Text style={styles.detail}><Text style={styles.bold}>Job:</Text> {job.jobDomain}</Text></View>
                            <TouchableOpacity onPress={() => handlePhonePress(job.phoneNumber)}>
                                <View style={styles.row}><FontAwesome5 name="phone" size={20} color="black" /><Text style={[styles.detail, styles.link]}><Text style={styles.bold}>Contact:</Text> {job.phoneNumber}</Text></View>
                            </TouchableOpacity>
                            <View style={styles.row}><FontAwesome5 name="user" size={20} color="black" /><Text style={styles.detail}><Text style={styles.bold}>Age:</Text> {job.age}</Text></View>
                            <View style={styles.row}><MaterialIcons name="location-on" size={20} color="black" /><Text style={styles.detail}><Text style={styles.bold}>Location:</Text> {job.area}, {job.city}</Text></View>
                        </View>
                    ))
                ) : (
                    
                    <Text style={styles.errorText}>No details found for this job.</Text>
                    
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        gap: 20
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 15,
        width: '90%',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'black',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        gap: 8,
    },
    detail: {
        fontSize: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    link: {
        color: 'black',
        
    },
    emptyImg:{
        height:100,
        width:100
    }
});

export default jobList;
