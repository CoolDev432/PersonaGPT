import { Client, Databases, ID, Storage } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://syd.cloud.appwrite.io/v1') 
  .setProject('persona');

const database = new Databases(client);
const storage = new Storage(client);

export { database, storage };