import Database from '@tauri-apps/plugin-sql'

export class Db {
  private _credentials: SqlData
  private _db: Database | null = null

  constructor(credentials: SqlData) {
    this._credentials = credentials
  }

  get credentials() {
    return this._credentials
  }

  public async connection() {
    const { user, pass, host, port, dbname, dbtype } = this._credentials
    this._validateCredentials(this._credentials)
    this._db = await Database.load(`${dbtype}://${user}:${pass}@${host}:${port}/${dbname}`)
    await this._verification()
  }

  private async _verification() {
    const db = this._requireDb()
    await db.select('SELECT version()')
  }

  private _requireDb() {
    if (!this._db) throw new Error('Database not loaded')
    return this._db
  }

  private _validateCredentials({ host, user, port, dbname }: SqlData) {
    if (host === '') throw String('A host is required')
    if (user === '') throw String('A user is required')
    if (port === '0') throw String('A port is required')
    if (dbname === '') throw String('A database is required')
  }
}