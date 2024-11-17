
export const users = [
    { id: 'user12345', name: 'Dagger Duckling', points: 50 },
    { id: 'user456', name: 'Jane Smith', points: 30 },
    { id: 'user789', name: 'Alice Brown', points: 70 },
  ];
  
  export const getUserById = (userId: string) => users.find((user) => user.id === userId);
  