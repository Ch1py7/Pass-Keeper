import { ErrorCode } from '@/errors/errors'
import { passwordsParser } from '@/services/parser'
import * as kdbxweb from 'kdbxweb'
import { createFile, updateFile } from './fs'

export class Kdbx {
	private _credentials: kdbxweb.Credentials
	private _db: kdbxweb.Kdbx | null = null

	constructor(password: string) {
		this._credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password))
	}

	public async load(arrayBuffer: ArrayBuffer) {
		this._db = await kdbxweb.Kdbx.load(arrayBuffer, this._credentials)
		this._validateRecycleBin()
	}

	public async loadBase64(base64: string) {
		const binaryData = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer
		this._db = await kdbxweb.Kdbx.load(binaryData, this._credentials)
		this._db.setKdf(kdbxweb.Consts.KdfId.Aes)
		this._validateRecycleBin()
		this.persist()
	}

	public async createDatabase(password: string, enter: boolean) {
		const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password))

		const db = kdbxweb.Kdbx.create(credentials, 'New Database')
		db.setKdf(kdbxweb.Consts.KdfId.Aes)

		const commonGroup = db.createGroup(db.getDefaultGroup(), 'Common')
		const commonCustomData = {
			color: 'red',
			icon: 'lucide:tree-pine',
		}

		const recycleBin = db.getGroup(db.meta.recycleBinUuid!)
		const recycleBinCustomData = {
			color: 'cyan',
			icon: 'lucide:trash',
		}

		commonGroup.notes = JSON.stringify(commonCustomData)
		recycleBin!.notes = JSON.stringify(recycleBinCustomData)

		const binaryData = await db.save()

		await createFile(binaryData, enter)
	}

	public async addCategory({ name, params }: Group) {
		const db = this._requireDb()
		const group = db.createGroup(db.getDefaultGroup(), name ? name : 'New Category')
		group.notes = JSON.stringify(params)
		this.persist()
	}

	public async updateCategory({ id, name, params }: Group) {
		const group = this._getGroupById(id)
		group.name = name
		group.notes = JSON.stringify(params)
		this.persist()
	}

	public async deleteCategory({ id }: Group) {
		const db = this._requireDb()
		const group = this._getGroupById(id)
		db.remove(group)
		this.persist()
	}

	public listCategories() {
		const db = this._requireDb()
		const groups = passwordsParser(db.groups[0]).groups
		return groups
	}

	public async addEntry(data: Entry) {
		const db = this._requireDb()
		const group = this._getGroupById(data.groupId)
		const entry = db.createEntry(group)
		this._setEntryFields(entry, data)
		this.persist()
	}

	public async updateEntry(data: Entry) {
		const entry = this._getEntryById(data)
		entry.pushHistory()
		this._setEntryFields(entry, data)
		entry.times.update()
		this.persist()
	}

	public async deleteEntry(data: ManageEntry) {
		const entry = this._getEntryById(data)
		this._requireDb().remove(entry)
		this.persist()
	}

	public async deleteEntryPermanently(data: ManageEntry) {
		const entry = this._getEntryById(data)
		const parentGroup = entry.parentGroup
		if (!parentGroup) throw new kdbxweb.KdbxError(ErrorCode.EntryHasNoParent)
		parentGroup.entries = parentGroup.entries.filter((e) => e.uuid.id !== data.id)
		this.persist()
	}

	public moveEntry(data: ManageEntry, groupId: string) {
		const entry = this._getEntryById(data)
		const group = this._getGroupById(groupId)
		this._requireDb().move(entry, group)
	}

	public listEntries() {
		const db = this._requireDb()
		const passwords = passwordsParser(db.groups[0])
		return passwords
	}

	public getRecycleBinId() {
		return this._validateRecycleBin().id
	}

	public async getBinary() {
		const db = this._requireDb()
		const binary = await db.save()
		return binary
	}

	public async persist() {
		const db = this._requireDb()
		const data = await db.save()
		updateFile(data)
	}

	private _validateRecycleBin() {
		const db = this._requireDb()
		let recycleBin = db.meta.recycleBinUuid
		if (!recycleBin) {
			db.createRecycleBin()
			recycleBin = db.meta.recycleBinUuid!
		}
		return recycleBin
	}

	private _requireDb() {
		if (!this._db) throw new kdbxweb.KdbxError(ErrorCode.DatabaseNotLoaded)
		return this._db
	}

	private _getGroupById(id: string) {
		const db = this._requireDb()
		const group = db.getGroup(id)
		if (!group) throw new kdbxweb.KdbxError(ErrorCode.GroupNotFound)

		return group
	}

	private _getEntryById({ id, groupId }: ManageEntry) {
		const group = this._getGroupById(groupId)
		const entry = Array.from(group.allEntries()).find((e) => e.uuid.id === id)
		if (!entry) throw new kdbxweb.KdbxError(ErrorCode.EntryNotFound)

		return entry
	}

	private _setEntryFields(entry: kdbxweb.KdbxEntry, data: Entry) {
		entry.fields.set('Title', data.title ? data.title : 'New Entry')
		entry.fields.set('UserName', data.username ? data.username : 'New Username')
		entry.fields.set('Password', data.password ? data.password : 'Test123!')
		entry.fields.set('URL', data.url ?? '')
		entry.fields.set('Notes', data.notes ?? '')
	}
}
