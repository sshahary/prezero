// src/components/Recycling/MaterialList.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDropOffContext } from '../../services/DropOffContext';

const MaterialList: React.FC = () => {
  const { dropOffs } = useDropOffContext();

  const materialCounts = dropOffs.reduce((acc, item) => {
    acc[item.material] = (acc[item.material] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Materials Summary</Text>
      {Object.entries(materialCounts).map(([material, count]) => (
        <View key={material} style={styles.card}>
          <Text style={styles.cardTitle}>{material}</Text>
          <Text style={styles.cardValue}>{count}</Text>
        </View>
      ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#10b981',
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    color: 'white',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MaterialList;
