import { teams, type TeamList } from '@/lib/appwrite'

export const ADMIN_TEAM_NAME = 'Admin'
export const ADMIN_TEAM_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_TEAM_ID ?? ADMIN_TEAM_NAME
export const REVIEWER_TEAM_NAME = 'Reviewer'
export const REVIEWER_TEAM_ID = process.env.NEXT_PUBLIC_APPWRITE_REVIEWER_TEAM_ID ?? REVIEWER_TEAM_NAME

export const getTeams = async (): Promise<TeamList> => {
  return await teams.list<TeamList>()
}
