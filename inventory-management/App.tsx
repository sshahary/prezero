// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialList from './components/Recycling/MaterialList';
import ScannerScreen from './screens/ScannerScreen';
import VendorDashboard from './screens/VendorDashboard';
import { DropOffProvider } from './services/DropOffContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <DropOffProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: keyof typeof Ionicons.glyphMap;

              if (route.name === 'Scanner') {
                iconName = 'qr-code';
              } else if (route.name === 'Materials') {
                iconName = 'layers';
              } else if (route.name === 'Vendor Dashboard') {
                iconName = 'bar-chart';
              } else {
                iconName = 'help-circle';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#10b981',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Scanner" component={ScannerScreen} />
          <Tab.Screen name="Materials" component={MaterialList} />
          <Tab.Screen name="Vendor Dashboard" component={VendorDashboard} />
        </Tab.Navigator>
      </NavigationContainer>
    </DropOffProvider>
  );
};

export default App;

