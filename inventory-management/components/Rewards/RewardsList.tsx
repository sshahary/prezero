import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const rewards = [
  { id: '1', name: 'Free Coffee', points: 120 },
  { id: '2', name: 'Discount Coupon', points: 200 },
];

const RewardsList: React.FC<{ userPoints: number }> = ({ userPoints }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rewards</Text>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.rewardItem}>
            <Text>{item.name}</Text>
            <Text>{item.points} points</Text>
            <Button
              title="Redeem"
              onPress={() =>
                userPoints >= item.points
                  ? alert('Reward Redeemed!')
                  : alert('Not enough points!')
              }
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rewardItem: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
});

export default RewardsList;
