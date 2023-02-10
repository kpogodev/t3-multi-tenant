import crypto from 'crypto';
export const generateRandomKey = () => crypto.randomBytes(20).toString('hex')
