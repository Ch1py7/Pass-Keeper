class TrieNode {
	children: Record<string, TrieNode> = {}
	entries: Set<Entry> = new Set()
}

export class PasswordTrie {
	private root = new TrieNode()

	private insertWord(word: string, entry: Entry) {
		let node = this.root
		for (const char of word.toLowerCase()) {
			if (!node.children[char]) node.children[char] = new TrieNode()
			node = node.children[char]
			node.entries.add(entry)
		}
	}

	private insertAllSubstrings(text: string, entry: Entry) {
		const lower = text.toLowerCase()
		for (let i = 0; i < lower.length; i++) {
			this.insertWord(lower.slice(i), entry)
		}
	}

	public insert(entry: Entry) {
		this.insertAllSubstrings(entry.title, entry)
		this.insertAllSubstrings(entry.username, entry)
		this.insertAllSubstrings(entry.url, entry)
	}

	public search(prefix: string): Entry[] {
		let node = this.root
		for (const char of prefix.toLowerCase()) {
			if (!node.children[char]) return []
			node = node.children[char]
		}
		return Array.from(node.entries)
	}
}
