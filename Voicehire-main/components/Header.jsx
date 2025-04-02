import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Define styles separately to ensure they're always available
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

const Header = ({ userName, userImage, logoUrl }) => {
  // Fallback values if props are undefined
  const displayName = userName || 'Guest';
  const displayUserImage = userImage || 'https://randomuser.me/api/portraits/men/1.jpg';
  const displayLogoUrl = logoUrl || 'https://picsum.photos/seed/logo/40/40';

  return (
    <View style={styles.header}>
      <Image
        source={{ uri: displayLogoUrl }}
        style={styles.logo}
        defaultSource={{ uri: displayLogoUrl }} // Fallback for loading
      />
      <View style={styles.userContainer}>
        <Image
          source={{ uri: displayUserImage }}
          style={styles.userImage}
          defaultSource={{ uri: displayUserImage }}
        />
        <View style={styles.headerText}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userName}>{displayName}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;