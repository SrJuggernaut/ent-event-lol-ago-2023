import { Client, Databases, Storage, Teams } from 'node-appwrite'
export { ID, Permission, Role } from 'node-appwrite'

export const client = new Client()
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
  .setKey(process.env.APPWRITE_API_KEY ?? '')

export const database = new Databases(client)

export const teams = new Teams(client)

export const storage = new Storage(client)
