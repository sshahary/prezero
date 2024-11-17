import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import MaterialScanner from '../components/Recycling/MaterialScanner';
import { useDropOffContext } from '../services/DropOffContext';

const ScannerScreen: React.FC = () => {
  const { addDropOff } = useDropOffContext();
  const [scanning, setScanning] = useState(true);
  const [currentMaterial, setCurrentMaterial] = useState('');
  const [scannedItem, setScannedItem] = useState<{ userId: string } | null>(null);

  const handleScanSuccess = (item: { userId: string }) => {
    // if (!currentMaterial) {
    //   alert('Please specify the material type before scanning.');
    //   return;
    // }
    addDropOff({ userId: item.userId, material: currentMaterial });
    setScannedItem(item);
    setScanning(false);
  };

  return (
    <View style={styles.container}>
      {scanning ? (
        <>
          <Text style={styles.header}>Scan a Drop-Off</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter material type (e.g., Plastic, Glass)"
            value={currentMaterial}
            onChangeText={setCurrentMaterial}
          />
          <MaterialScanner onScanSuccess={handleScanSuccess} />
          <Text style={styles.instruction}>Align the item within the frame to scan.</Text>
        </>
      ) : (
        <View style={styles.resultContainer}>
          <View style={styles.scannedInfoContainer}>
            <Image
              source={require('../assets/scanned.png')} // Example icon or placeholder image
              style={styles.scannedImage}
            />
            <Text style={styles.successText}>Scanned Successfully!</Text>
            <Text style={styles.scannedText}>User ID: eb1d7b66</Text>
            {/* <Text style={styles.scannedText}>Material: {currentMaterial}</Text> */}
          </View>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={() => {
              setScanning(true);
              setCurrentMaterial('');
            }}
          >
            <Text style={styles.scanButtonText}>Scan Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() => alert('Proceed to payment subscription!')}
          >
            <Text style={styles.paymentButtonText}>Collect Deposit</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    width: '90%',
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  instruction: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedInfoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scannedImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 8,
  },
  scannedText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  scanButton: {
    backgroundColor: '#10b981',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '80%',
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScannerScreen;
