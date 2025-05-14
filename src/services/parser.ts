import type * as kdbxweb from 'kdbxweb'

export const passwordsParser = (mainGroup: kdbxweb.KdbxGroup): Entries => {
	const parseEntry = (entry: kdbxweb.KdbxEntry): Entry => ({
		id: entry.uuid.id,
		title: entry.fields.get('Title')?.toString() || '',
		username: entry.fields.get('UserName')?.toString() || '',
		password: entry.fields.get('Password')?.toString() || '',
		url: entry.fields.get('URL')?.toString() || '',
		notes: entry.fields.get('Notes')?.toString() || '',
		groupName: entry.parentGroup?.name ?? '',
		groupId: entry.parentGroup?.uuid.id ?? '',
		creationTime: entry.times.creationTime?.getTime() ?? 0,
		lastModTime: entry.times.lastModTime?.getTime() ?? 0,
	})

	const parseGroup = (group: kdbxweb.KdbxGroup): Group => {
		const entries: Entry[] = group.entries.map(parseEntry)
		return {
			id: group.uuid.id,
			name: group.name ?? 'New Category',
			params: JSON.parse(group.notes ? group.notes : '{}'),
			entries,
		}
	}

	const groups: Group[] = mainGroup.groups.map(parseGroup)

	return {
		name: mainGroup.name ?? 'My Database',
		groups,
	}
}
