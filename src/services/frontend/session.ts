import { ID, account, type User, type UserPreferences } from '@/lib/appwrite'

export const getCurrentUser = async (): Promise<User> => {
  return await account.get<UserPreferences>()
}

export const updateUserPreferences = async (data: UserPreferences): Promise<User> => {
  return await account.updatePrefs<UserPreferences>(data)
}

export const updatePassword = async (newPassword: string, oldPassword: string): Promise<User> => {
  return await account.updatePassword<UserPreferences>(newPassword, oldPassword)
}

export const login = async (email: string, password: string): Promise<User> => {
  await account.createEmailSession(email, password)
  return await getCurrentUser()
}

export const logout = async (): Promise<void> => {
  await account.deleteSession('current')
}

export const register = async (email: string, password: string): Promise<void> => {
  await account.create<UserPreferences>(ID.unique(), email, password)
}
