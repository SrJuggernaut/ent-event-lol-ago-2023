import { Account, Client, Databases, Storage, Teams, type Models } from 'appwrite'
export { ID, Permission, Query, Role } from 'appwrite'

export const client = new Client()
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')

export const account = new Account(client)

export const databases = new Databases(client)

export const teams = new Teams(client)

export const storage = new Storage(client)

export interface UserPreferences {
  summonerName?: string
}

export type User = Models.User<UserPreferences>

export type TeamList = Models.TeamList<Record<string, any>>

export type Session = Models.Session
