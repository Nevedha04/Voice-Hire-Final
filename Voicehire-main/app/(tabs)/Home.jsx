import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const jobDomains = [
  { title: 'Plumber', icon: 'pipe' },
  { title: 'Painter', icon: 'palette' },
  { title: 'Caretaker', icon: 'human-male-female-child' },
  { title: 'Security', icon: 'shield-lock' },
  { title: 'Electrician', icon: 'flash' },
  { title: 'Cook', icon: 'chef-hat' },
  { title: 'House Cleaner', icon: 'broom' },
  { title: 'Car Driver', icon: 'car' },
];

const Home = () => {
  const [employeeCounts, setEmployeeCounts] = useState({});

  const fetchEmployeeCount = async (jobTitle) => {
    try {
      const response = await fetch(`http://192.168.1.36:8080/api/employees/countByJobDomain?jobDomain=${encodeURIComponent(jobTitle)}`);
      const data = await response.json();
      console.log(`Count for ${jobTitle}:`, data); // Debugging log
      setEmployeeCounts(prevCounts => ({ ...prevCounts, [jobTitle]: data })); // Use `data` directly
    } catch (error) {
      console.error(`Error fetching data for ${jobTitle}:`, error);
    }
  };
  
  useEffect(() => {
    jobDomains.forEach(job => {
      fetchEmployeeCount(job.title);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search" />
      </View>

      <ScrollView contentContainerStyle={{ paddingTop: 60 }}>
        <Text style={styles.title}>WELCOME TO VOICE HIRING FOR ILLITERATES</Text>

        <View style={styles.jobCard}>
          <Image 
              source={{ uri: 'https://i.pinimg.com/736x/9b/96/80/9b9680f9b844da0db6646efe87830e86.jpg' }} 
              style={styles.jobImage} 
              resizeMode="cover" 
          />
          <Text style={styles.jobTitle}>Find your Jobs and Hire easily</Text>
          <Text style={styles.jobSubtitle}>Access Anytime, Anywhere</Text>
          <Text style={styles.jobDescription}>
              A Platform designed to connect many skilled workers struggling to find jobs due to illiteracy or lack of digital access. 
              We ensure easy job access for painters, drivers, caretakers, security guards, cooks, and many others by providing a voice-based hiring system.
          </Text>
        </View> 

        <Text style={styles.sectionTitle}>Categories</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          <View style={styles.categoriesWrapper}> 
            {jobDomains.map((job, index) => (
              <TouchableOpacity key={index} style={[styles.categoryCard, styles[job.title.toLowerCase().replace(' ', '')]]}>
                <Icon name={job.icon} size={30} color="#000" />
                <Text style={styles.categoryTitle}>{job.title}</Text>
                <Text style={styles.categoryJobs}>
                  {employeeCounts[job.title] !== undefined ? employeeCounts[job.title] : 'Loading...'}
              </Text>

              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  searchBarContainer: {
    position: 'absolute',
    top: 10,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderRadius: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobCard: {
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    
  },
  jobImage: {
    width: '100%', 
    height: 165, 
    borderRadius: 10,
    marginBottom: 10, 
  },
  jobTitle: {
    color: '#fff',
    fontSize: 27,
    fontWeight: 'bold',
  },
  jobSubtitle: {
    color: '#fff',
    fontSize: 22,
    marginTop: 10,
  },
  jobDescription: {
    color: '#fff',
    fontSize: 16,
    marginTop: 18,
    textAlign: "center",
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  categoriesWrapper: {
    flexDirection: 'row',
  },
  categoryCard: {
    height: 150,
    width: 130,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  categoryJobs: {
    fontSize: 14,
    color: '#555',
  },
  plumber: { backgroundColor: '#E0EAF3' },
  painter: { backgroundColor: '#F3E9E0' },
  caretaker: { backgroundColor: '#E0F3E6' },
  security: { backgroundColor: '#F3F0E0' },
  electrician: { backgroundColor: '#E6E0F3' },
  cook: { backgroundColor: '#F3E0F0' },
  housecleaner: { backgroundColor: '#E0F3F2' },
  cardriver: { backgroundColor: '#F0F3E0' },
});

export default Home;
