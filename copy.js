;(() => {
	const connectBtns = document.querySelectorAll('button')
	const btns = [...connectBtns].filter(
		btn => btn.innerText === 'Connect'
	)
	// console.log(connectBtns)
	let i = 0
	while (i < btns.length) {
		setTimeout(() => {
			btns[i].click()
			setTimeout(() => {
				const sendbtn = document.querySelector(
					'[aria-label="Send now"]'
				)
				if (!!sendbtn) {
					sendbtn.click()
				} else return
			}, 1500)
			i++
		}, 3000)
		console.log('btns')
		console.log(i)
	}
})()
