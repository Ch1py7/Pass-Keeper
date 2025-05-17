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
		const [{ binaryFile }] = await this._selectFile()
		const base64 = arrayBufferToBase64(binaryData)
		if (binaryFile) {
			this._updateFile(base64)
		} else {
			this._createFile(base64)
		}
	}

	public async syncToLocal() {
		const [{ binaryFile }] = await this._selectFile()

		if (!binaryFile) throw String('Non-existent file')

		return binaryFile
	}

	private async _createTable() {
		const sql = 'CREATE TABLE IF NOT EXISTS `PassKeeper` (binaryFile TEXT NOT NULL)'

		const db = this._requireDb()
		await db.execute(sql)
	}

	private async _selectFile() {
		const sql = 'SELECT binaryFile from `PassKeeper`'

		const db = this._requireDb()
		const selection = (await db.select(sql)) as { binaryFile: string }[]
		return selection.length === 0 ? [{ binaryFile: '' }] : selection
	}

	private async _createFile(binaryFile: string) {
		const sql = 'INSERT into `PassKeeper` (binaryFile) VALUES (?)'

		const db = this._requireDb()
		await db.execute(sql, [binaryFile])
	}

	private async _updateFile(binaryFile: string) {
		const sql = 'UPDATE `PassKeeper` SET binaryFile = ?'

		const db = this._requireDb()
		await db.execute(sql, [binaryFile])
	}
}
