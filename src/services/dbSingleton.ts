import type { Db } from './db'

let dbInstance: Db | null = null

export const setDbInstance = (instance: Db | null) => {
  dbInstance = instance
}

export const getDbInstance = () => {
  return dbInstance!
}
