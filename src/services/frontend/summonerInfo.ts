import { Permission, Role, databases } from '@/lib/appwrite'
import { type SummonerData, type SummonerDataDocument } from '@/types/summonerInfo'
import { DATABASE_ID } from './database'

export const SUMMONER_INFO_COLLECTION_NAME = 'summoner_info'
const SUMMONER_INFO_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SUMMONER_INFO_COLLECTION_ID ?? SUMMONER_INFO_COLLECTION_NAME

export const createSummonerInfo = async ({ userId, email, summonerName }: SummonerData): Promise<SummonerDataDocument> => {
  const permissions = [
    Permission.read(Role.user(userId)),
    Permission.update(Role.user(userId))
  ]
  return await databases.createDocument<SummonerDataDocument>(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, userId, { summonerName, email, tasks: [] }, permissions)
}

export const addTaskToSummoner = async (userId: string, taskId: string): Promise<SummonerDataDocument> => {
  const summonerInfo = await getSummonerInfo(userId)
  const tasks = summonerInfo.tasks?.map((task) => task.$id) ?? []
  tasks.push(taskId)
  const newSummonerInfo: Omit<SummonerData, 'userId'> & { tasks: string[] } = {
    summonerName: summonerInfo.summonerName,
    email: summonerInfo.email,
    tasks
  }
  return await databases.updateDocument<SummonerDataDocument>(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, userId, newSummonerInfo)
}

export const getSummonerInfo = async (userId: string): Promise<SummonerDataDocument> => {
  return await databases.getDocument<SummonerDataDocument>(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, userId)
}
