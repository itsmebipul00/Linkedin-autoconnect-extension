const conectBtn = document.querySelector('.connect-btn')
const invitations = document.querySelector('.invitations')

const handleConnect = async () => {
	if (conectBtn.innerText === 'Connect') {
		const tab = await getCurrentTab()
		console.log(tab)
		const { id, url } = tab
		chrome.scripting.executeScript({
			target: { tabId: id, allFrames: true },
			files: ['copy.js'],
		})
		conectBtn.innerText = 'Stop'
	} else {
		conectBtn.innerText = 'Stop'
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
	if (conectBtn.innerText === 'Stop') {
		clearTimeout(request.timer)
	}
})

conectBtn.addEventListener('click', handleConnect)
