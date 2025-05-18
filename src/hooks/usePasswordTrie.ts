import { PasswordTrie } from '@/services/passwordTrie'
import { useAppStore } from '@/store/AppStore'
import { useMemo } from 'react'

export const usePasswordTrie = (searchQuery: string) => {
	const {
		entries: { groups },
		activeCategory,
		file: { recycleBinId },
	} = useAppStore()

	const trie = useMemo(() => {
		const t = new PasswordTrie()
		for (const group of groups) {
			for (const entry of group.entries) {
				t.insert(entry)
			}
		}
		return t
	}, [groups])

	const results = useMemo(() => {
		const matches = searchQuery ? trie.search(searchQuery) : groups.flatMap((g) => g.entries)
		return activeCategory.id === 'All'
			? matches.filter((e) => e.id !== recycleBinId)
			: matches.filter((e) => {
					const group = groups.find((g) => g.entries.includes(e))
					return group?.id === activeCategory.id
				})
	}, [searchQuery, activeCategory, trie, groups, recycleBinId])

	return results
}
