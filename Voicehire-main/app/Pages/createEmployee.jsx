import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';

const jobList = [
    { id: '1', title: 'Plumber' },
    { id: '2', title: 'Painter' },
    { id: '3', title: 'Caretaker' },
    { id: '4', title: 'Security' },
    { id: '5', title: 'Electrician' },
    { id: '6', title: 'Cook' },
    { id: '7', title: 'House Cleaner' },
    { id: '8', title: 'Car Driver' },
];

const CreateEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        jobDomain: '',
        area: '',
        phoneNumber: '',
        city: '',
        age: '',
    });
    const [modalVisible, setModalVisible] = useState(false);

    const handleInputChange = (field, value) => {
        setEmployee({ ...employee, [field]: value });
    };

    const handleJobSelect = (job) => {
        setEmployee({ ...employee, jobDomain: job });
        setModalVisible(false);
    };

    const handleSubmit = async () => {
        if (!employee.name || !employee.phoneNumber || !employee.age) {
            Alert.alert('Error', 'Please fill required fields (Name, Phone, Age)');
            return;
        }
        if (employee.phoneNumber.length !== 10) {
            Alert.alert('Error', 'Phone number must be 10 digits');
            return;
        }
        if (employee.age < 18 || employee.age > 60) {
            Alert.alert('Error', 'Age must be between 18 and 60');
            return;
        }
        try {
            console.log('Data being sent to backend:', employee);
            const response = await axios.post('http://192.168.1.36:8080/api/employees/create', employee);
            console.log('Employee added:', response.data);
            Alert.alert('Success', 'Employee created successfully!');
            setEmployee({ name: '', jobDomain: '', area: '', phoneNumber: '', city: '', age: '' });
        } catch (error) {
            console.error('There was an error:', error.response ? error.response.data : error.message);
            Alert.alert('Error', 'Failed to create employee');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create New Employee</Text>

            <Text style={styles.label}>Name *</Text>
            <TextInput style={styles.input} placeholder='Enter Name' value={employee.name} onChangeText={(text) => handleInputChange('name', text)} />

            <Text style={styles.label}>Job Domain *</Text>
            <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
                <Text>{employee.jobDomain || 'Select Job Domain'}</Text>
            </TouchableOpacity>

            <Text style={styles.label}>Area</Text>
            <TextInput style={styles.input} placeholder='Enter Area' value={employee.area} onChangeText={(text) => handleInputChange('area', text)} />

            <Text style={styles.label}>Phone Number *</Text>
            <TextInput style={styles.input} placeholder='Enter Phone Number' value={employee.phoneNumber} onChangeText={(text) => handleInputChange('phoneNumber', text)} keyboardType='phone-pad' />

            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} placeholder='Enter City' value={employee.city} onChangeText={(text) => handleInputChange('city', text)} />

            <Text style={styles.label}>Age *</Text>
            <TextInput style={styles.input} placeholder='Enter Age' value={employee.age} onChangeText={(text) => handleInputChange('age', text)} keyboardType='numeric' />

            <Button title='Submit' onPress={handleSubmit} />

            <Modal visible={modalVisible} animationType='slide' transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <FlatList
                            data={jobList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.jobItem} onPress={() => handleJobSelect(item.title)}>
                                    <Text style={styles.jobText}>{item.title}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Button title='Close' onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 5, marginTop: 15 },
    input: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, marginBottom: 15, paddingHorizontal: 10, backgroundColor: '#fff', justifyContent: 'center' },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
    jobItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    jobText: { fontSize: 18 },
});

export default CreateEmployee;
