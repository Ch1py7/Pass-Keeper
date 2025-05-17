import { arrayBufferToBase64 } from '@/utils/common'
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

	public async syncToDb(binaryData: ArrayBuffer) {
		await this._createTable()
		const [{ file }] = await this._selectFile()
		const base64 = arrayBufferToBase64(binaryData)
		if (file) {
			this._updateFile(base64)
		} else {
			this._createFile(base64)
		}
	}

	public async syncToLocal() {
		const [{ file }] = await this._selectFile()

		if (!file) throw String('Non-existent file')

		return file
	}

	private async _createTable() {
		const sql =
			this.credentials.dbtype === 'mysql'
				? 'CREATE TABLE IF NOT EXISTS `PassKeeper` (file TEXT NOT NULL)'
				: 'CREATE TABLE IF NOT EXISTS PassKeeper (file TEXT NOT NULL)'

		const db = this._requireDb()
		await db.execute(sql)
	}

	private async _selectFile() {
		const sql =
			this.credentials.dbtype === 'mysql'
				? 'SELECT file from `PassKeeper`'
				: 'SELECT file from PassKeeper'

		const db = this._requireDb()
		const selection = (await db.select(sql)) as { file: string }[]
		return selection.length === 0 ? [{ file: '' }] : selection
	}

	private async _createFile(file: string) {
		const sql =
			this.credentials.dbtype === 'mysql'
				? 'INSERT into `PassKeeper` (file) VALUES (?)'
				: 'INSERT into PassKeeper (file) VALUES ($1)'

		const db = this._requireDb()
		await db.execute(sql, [file])
	}

	private async _updateFile(file: string) {
		const sql =
			this.credentials.dbtype === 'mysql'
				? 'UPDATE `PassKeeper` SET file = ?'
				: 'UPDATE PassKeeper SET file = $1'

		const db = this._requireDb()
		await db.execute(sql, [file])
	}
}
