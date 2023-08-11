import { Account, Client, type Models } from 'appwrite'
export { ID } from 'appwrite'

export const client = new Client()
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')

export const account = new Account(client)

export interface UserPreferences {
  summonerName?: string
}

export type User = Models.User<UserPreferences>
export type Session = Models.Session
