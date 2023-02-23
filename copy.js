function sleepThree() {
	return new Promise(resolve => {
		const timerThree = setTimeout(() => {
			const dontKnow = document.querySelector(
				'[aria-label="We don\'t know each other"]'
			)
			const connect = document.querySelector('[aria-label="Connect"]')
			if (!connect && !dontKnow) {
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

function sleepFour() {
	return new Promise(resolve => {
		const timerFour = setTimeout(() => {
			const sendbtn = document.querySelector(
				'[aria-label="Send now"]'
			)
			if (!!sendbtn) {
				sendbtn.click()
			} else clearTimeout(timerFour)
			resolve()
		}, 1500)
	})
}

function sleepTwo() {
	return new Promise(resolve => {
		const timerTwo = setTimeout(() => {
			const connect = document.querySelector('[aria-label="Connect"]')
			if (!connect) {
				clearTimeout(timerTwo)
			} else {
				connect.click()
			}
			resolve()
		}, 1500)
	})
}

function sleepOne(i, btns) {
	return new Promise(resolve =>
		setTimeout(
			async i => {
				btns[i].click()
				await sleepThree()
				await sleepTwo()
				await sleepFour()
				resolve()
			},
			2000,
			i
		)
	)
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

	let i = 0
	while (i < btns.length) {
		if (!!breakFromWhileLoop) {
			break
		}
		await chrome.runtime.sendMessage({
			total: btns.length,
			current: i,
		})
		await sleepOne(i, btns)
		i++
	}
})()
