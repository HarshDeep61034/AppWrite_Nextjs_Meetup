import { Account, Client, Databases } from "appwrite";
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("669dd3dc0038c4c04e63");

export const account = new Account(client);
export const database = new Databases(client);
export { ID } from "appwrite";
