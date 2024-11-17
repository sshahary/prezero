// src/screens/ScannerScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import MaterialScanner from '../components/Recycling/MaterialScanner';
import { useDropOffContext } from '../services/DropOffContext';

const ScannerScreen: React.FC = () => {
  const { addDropOff } = useDropOffContext();
  const [scanning, setScanning] = useState(true);
  const [currentMaterial, setCurrentMaterial] = useState('');

  const handleScanSuccess = (item: { userId: string }) => {
    if (!currentMaterial) {
      alert('Please specify the material type before scanning.');
      return;
    }
    addDropOff({ userId: item.userId, material: currentMaterial });
    setScanning(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scan a Drop-Off</Text>
      {scanning ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter material type (e.g., Plastic, Glass)"
            value={currentMaterial}
            onChangeText={setCurrentMaterial}
          />
          <MaterialScanner onScanSuccess={handleScanSuccess} />
        </>
      ) : (
        <View>
          <Text>Item added successfully!</Text>
          <Button title="Scan Another" onPress={() => setScanning(true)} />
        </View>
      )}
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
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
});

export default ScannerScreen;
