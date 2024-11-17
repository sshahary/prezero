import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { CameraView, Camera } from 'expo-camera';

interface MaterialScannerProps {
  onScanSuccess: (data: { userId: string }) => void;
}

const MaterialScanner: React.FC<MaterialScannerProps> = ({ onScanSuccess }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    onScanSuccess({ userId: data }); // Assuming QR contains only the userId
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.rectangleContainer}>
        <View style={styles.rectangle} />
      </View>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Scan Again" onPress={() => setScanned(false)} />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    height: Dimensions.get('window').width * 0.6,
    width: Dimensions.get('window').width * 0.8,
    borderWidth: 2,
    borderColor: '#10b981',
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export default MaterialScanner;
