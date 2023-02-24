function sleepOne() {
	return new Promise(resolve => {
		const timerThree = setTimeout(() => {
			const dontKnow = document.querySelector(
				'[aria-label="We don\'t know each other"]'
			)
			const connect = document.querySelector('[aria-label="Connect"]')
			if (!connect && !dontKnow) {
				console.log('timerThree')
				clearTimeout(timerThree)
			} else if (!dontKnow) {
				connect.click()
			} else {
				dontKnow.click()
				connect.click()
			}
			resolve()
		}, 1500)
	})
}

function sleepTwo() {
	return new Promise(resolve => {
		const timerTwo = setTimeout(() => {
			const connect = document.querySelector('[aria-label="Connect"]')
			if (!connect) {
				console.log('timerTwo')
				clearTimeout(timerTwo)
			} else {
				connect.click()
			}
			resolve()
		}, 1500)
	})
}

function sleepThree() {
	return new Promise(resolve => {
		const timerFour = setTimeout(() => {
			const sendbtn = document.querySelector(
				'[aria-label="Send now"]'
			)
			if (!sendbtn) {
				console.log('timerFour')
				clearTimeout(timerFour)
			} else sendbtn.click()
			resolve()
		}, 1500)
	})
}

function resolveConnectModals(i, btns) {
	return new Promise(resolve => {
		setTimeout(
			async i => {
				btns[i].click()
				await sleepOne()
				await sleepTwo()
				await sleepThree()
				resolve()
			},
			3000,
			i
		)
	})
}

;(async () => {
	let breakFromWhileLoop = false
	const connectBtns = document.querySelectorAll('button')
	const btns = [...connectBtns].filter(
		btn => btn.innerText === 'Connect'
	)

	chrome.runtime.onMessage.addListener(function (request) {
		if (request.loopbreak) {
			breakFromWhileLoop = true
		}
	})

	if (breakFromWhileLoop) return

	let i = 0
	while (i < btns.length) {
		if (!!breakFromWhileLoop) {
			break
		}
		await resolveConnectModals(i, btns)
		await chrome.runtime.sendMessage({
			total: btns.length,
			current: i + 1,
		})
		i++
	}
})()
