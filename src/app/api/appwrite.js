import { Client, Account, Storage } from 'appwrite';

export const client = new Client();

client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); // Replace with your project ID

export const account = new Account(client)
export const storage = new Storage(client)


export { ID } from 'appwrite';
