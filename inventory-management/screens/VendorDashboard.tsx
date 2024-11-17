// src/screens/VendorDashboard.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDropOffContext } from '../services/DropOffContext';

const VendorDashboard: React.FC = () => {
  const { dropOffs } = useDropOffContext();

  const totalDropOffs = dropOffs.length;
  const uniqueUsers = [...new Set(dropOffs.map((item) => item.userId))].length;

  const materialCounts = dropOffs.reduce((acc, item) => {
    acc[item.material] = (acc[item.material] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi, Vendor!</Text>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Total Drop-Offs</Text>
          <Text style={styles.cardValue}>{totalDropOffs}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Unique Users</Text>
          <Text style={styles.cardValue}>{uniqueUsers}</Text>
        </View>
      </View>
      <Text style={styles.subHeader}>Recent Activity</Text>
      <FlatList
        data={dropOffs}
        keyExtractor={(item, index) => `${item.userId}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>User ID: {item.userId}</Text>
            <Text style={styles.itemText}>Material: {item.material}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#10b981',
    padding: 16,
    borderRadius: 12,
    width: '48%',
  },
  cardTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
});

export default VendorDashboard;
