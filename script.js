const conectBtn = document.querySelector('.connect-btn')
const invitations = document.querySelector('.invitations')

const handleConnect = async () => {
	const tab = await getCurrentTab()
	const { id, url } = tab
	if (conectBtn.innerText === 'Connect') {
		chrome.scripting.executeScript({
			target: { tabId: id, allFrames: true },
			files: ['copy.js'],
		})
		conectBtn.innerText = 'Stop'
	} else {
		conectBtn.innerText = 'Connect'
		await chrome.tabs.sendMessage(tab.id, {
			loopbreak: true,
		})
	}
}

const getCurrentTab = async () => {
	let queryOptions = { active: true }
	let [tab] = await chrome.tabs.query(queryOptions)
	return tab
}

chrome.runtime.onMessage.addListener(function (request) {
	console.log(request)
	invitations.innerText = `${request.current} of ${request.total} requests sent`
})

conectBtn.addEventListener('click', handleConnect)
