import { type Models } from 'appwrite'

export interface SummonerData {
  userId: string
  summonerName: string
  email: string
}

export interface SummonerDataDocument extends Omit<SummonerData, 'userId'>, Models.Document {}

export interface SummonerDataDocumentList extends Models.DocumentList<SummonerDataDocument> {}
