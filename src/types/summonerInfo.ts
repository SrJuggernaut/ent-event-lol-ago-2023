import { type Models } from 'appwrite'
import { type TaskDocument } from './tasks'

export interface SummonerData {
  userId: string
  summonerName: string
  email: string
}

export interface SummonerDataDocument extends Omit<SummonerData, 'userId'>, Models.Document {
  tasks: TaskDocument[] | null
}

export interface SummonerDataDocumentList extends Models.DocumentList<SummonerDataDocument> {}
