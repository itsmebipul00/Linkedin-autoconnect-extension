const conectBtn = document.querySelector('.connect-btn')

const handleConnect = async () => {
	const tab = await getCurrentTab()
	console.log(tab)
	const { id, url } = tab
	chrome.scripting.executeScript({
		target: { tabId: id, allFrames: true },
		files: ['copy.js'],
	})
}

const getCurrentTab = async () => {
	let queryOptions = { active: true }
	let [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

conectBtn.addEventListener('click', handleConnect)
