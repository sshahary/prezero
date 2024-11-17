import * as Crypto from 'expo-crypto';

export const calculateHash = async (text: string): Promise<string> => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    text
  );
};

