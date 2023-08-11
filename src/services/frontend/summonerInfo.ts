import { databases } from '@/lib/appwrite'
import { type SummonerData, type SummonerDataDocument } from '@/types/summonerInfo'
import { DATABASE_ID } from './database'

export const SUMMONER_INFO_COLLECTION_NAME = 'summoner_info'
const SUMMONER_INFO_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SUMMONER_INFO_COLLECTION_ID ?? SUMMONER_INFO_COLLECTION_NAME

export const createSummonerInfo = async ({ userId, email, summonerName }: SummonerData): Promise<SummonerDataDocument> => {
  return await databases.createDocument<SummonerDataDocument>(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, userId, { summonerName, email })
}
