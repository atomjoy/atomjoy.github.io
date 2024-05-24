// Globals
let stickSmile = 0

// Functions
function openMenu() {
	let el = document.querySelector('.atomjoy-open-menu')
	let fmc = document.querySelector('#close-fixed-menu')

	el.addEventListener('click', () => {
		console.log('Open menu')
		let fm = document.querySelector('.atomjoy-fixed-menu')
		fm.classList.add('atomjoy-fixed-menu-open')
	})

	fmc.addEventListener('click', () => {
		console.log('Close menu')
		let fm = document.querySelector('.atomjoy-fixed-menu')
		fm.classList.remove('atomjoy-fixed-menu-open')
	})
}

function validateEmail(email) {
	var re = /\S+@\S+\.\S+/
	return re.test(email)
}

function closeTooltip(id = 'tooltip') {
	const t = document.getElementById(id)
	t.style.display = 'none'
}

function openTooltip(msg = '', id = 'tooltip') {
	const t = document.getElementById(id)
	t.style.display = 'inherit'
	const m = document.getElementById('tooltip-message')
	m.innerText = msg
}

function subscribeEmail(id = '#subscribe-email') {
	const mail = document.querySelector(id)
	if (validateEmail(mail.value)) {
		openTooltip('Twój adres e-mail został zapisany do newslettera. Pozdrawiam!')
		mail.value = ''
	} else {
		openTooltip('Podaj poprawny adres e-mail.')
		mail.value = ''
	}
}

function sendEmail() {
	let recipient = 'atomjoy.official@gmail.com'
	let name = document.querySelector('#msgName').value ?? ''
	let email = document.querySelector('#msgEmail').value ?? ''
	let msg = document.querySelector('#msgText').value ?? ''
	let url = 'mailto:?subject=Dzień Dobry&to=' + recipient + '&body=' + msg + '<br/>Pozdrawiam<br/>' + name + '<br/> ' + email
	url = url.replace(/<br\s*\/?>/gm, '%0D%0A')
	if (validateEmail(email) && name != '' && msg != '') {
		// Redirect to email client
		location.href = url
	} else {
		openTooltip('Wypełnij poprawnie formularz!')
	}
}

function splitText(id = '#target') {
	const target = document.querySelector(id)
	const results = Splitting({
		target: target,
		by: 'chars',
		key: null,
		whitespace: true,
	})

	console.log(results)
}

function runLoader() {
	// Declarations
	var loader = gsap.timeline({ repeat: 1, repeatDelay: 1 })
	// Defaults
	gsap.set('.letter', { opacity: 0, scale: 1 })
	gsap.set('body', { overflow: 'hidden' })
	gsap.set('#s3', {
		transformStyle: 'preserve-3d',
		perspective: 700,
	})
	gsap.set('.hello', { xPercent: -100 })

	// Scroll body to top
	loader.call(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	})

	// Animations
	loader.to('.circle', {
		width: '300vh',
		height: '300vh',
		y: '-150vh',
		x: '-150vh',
		duration: 2,
		stagger: {
			amount: 0.6,
			from: 'random',
		},
	})

	loader.to(
		'.loader',
		{
			y: '-20px',
			repeat: -1,
			yoyo: true,
			stagger: {
				amount: 0.3,
				from: 'random',
			},
		},
		0
	)

	loader.to(
		'.letter',
		{
			opacity: 1,
			backgroundColor: '#000',
			stagger: {
				amount: 2,
				from: 'random',
			},
		},
		0
	)

	loader.to('.loader-wrapper', {
		x: '-300px',
		borderRight: '300px solid #000',
		borderRadius: '0vh',
		duration: 1,
		delay: 1,
		width: 0,
		// toggleClass: { targets: '.s2', className: 'active' },
		onComplete: () => {
			gsap.set('body', { overflowY: 'scroll' })
			// window.scrollTo({ top: 0, behavior: 'smooth' })
		},
	})

	loader.call(() => {
		console.log('timeline completed')
		gsap.to('.hello', {
			xPercent: 0,
			rotationX: 360,
			opacity: 1,
		})
	})

	// Run animation
	loader.play()

	gsap.to('.atomjoy-bg', {
		scrollTrigger: {
			trigger: '.s3',
			scrub: true,
			start: '10% top', // triggerPosition viewPosition
			end: '30%',
		},
		// duration: 1,
		// stagger: 1,
		rotationY: -180,
		transformOrigin: '100% 0%',
	})

	// gsap.from('.techicon', {
	// 	scrollTrigger: {
	// 		trigger: '.techicon',
	// 		start: 'top bottom',
	// 		end: 'center center',
	// 		scrub: true,
	// 		delay: 0.3,
	// 	},
	// 	xPercent: -150,
	// 	// stagger: 1,
	// })

	const techicons = gsap.utils.toArray('.techicon')
	techicons.forEach((box) => {
		gsap.from(box, {
			opacity: 0,
			xPercent: -150,
			rotation: -180,
			scrollTrigger: {
				trigger: box,
				start: 'top bottom', // triggerPosition viewPosition
				end: '+=250',
				scrub: true,
			},
		})
	})

	const techlangs = gsap.utils.toArray('.techlang')
	techlangs.forEach((box) => {
		gsap.from(box, {
			xPercent: 100,
			scrollTrigger: {
				trigger: box,
				start: 'top bottom', // triggerPosition viewPosition
				end: '+=300',
				scrub: true,
			},
		})
	})

	const techlangs2 = gsap.utils.toArray('.techdesc')
	techlangs2.forEach((box) => {
		gsap.from(box, {
			yPercent: 100,
			rotation: 180,
			scrollTrigger: {
				trigger: box,
				start: '25% bottom', // triggerPosition viewPosition
				end: '+=100',
				scrub: true,
			},
		})
	})

	gsap.from('.footer-left', {
		xPercent: -200,
		scrollTrigger: {
			trigger: '.footer',
			start: 'top bottom', // triggerPosition viewPosition
			scrub: true,
		},
		borderRight: '400px solid #fff',
	})

	gsap.from('.subscribe-logo', {
		yPercent: 400,
		scrollTrigger: {
			trigger: '.footer',
			start: 'top bottom', // triggerPosition viewPosition
			scrub: true,
		},
	})
}

window.onresize = () => {
	location.reload()
}

// Onload
window.onload = () => {
	// Run loader
	runLoader()
	// Run
	openMenu()
	// Split
	splitText('#target')
	// Letters
	gsap.to('.char', { yPercent: 110 })
	// Anim
	gsap.to('.char', {
		delay: 1,
		yPercent: 0,
		repeat: -1,
		yoyo: true,
		ease: 'bounce',
		stagger: {
			// amount: 3,
			each: 0.1,
			from: 'random',
		},
		// stagger: {
		// 	amount: 1,
		// 	from: 'random',
		// },
	})

	// gsap.to('.t2', {
	// 	scrollTrigger: {
	// 		trigger: '.s1',
	// 		scrub: true,
	// 	},
	// 	x: '-200vw',
	// 	// y: 400,
	// 	// duration: 1,
	// 	// repeat: -1,
	// 	// yoyo: true,
	// 	// ease: 'power1.inOut',
	// 	// opacity: 1,
	// 	// scale: 1,
	// 	// trigger: '.s2',
	// 	// scrub: true,
	// })

	document.querySelector('.smile').addEventListener('click', () => {
		stickSmile = !stickSmile
	})

	window.addEventListener('mousemove', (e) => {
		// cursor
		document.querySelectorAll('.cursor-small').forEach((el) => {
			el.style.top = e.pageY + 'px'
			el.style.left = e.pageX + 'px'
		})

		document.querySelectorAll('.cursor-border').forEach(async (el) => {
			await new Promise((r) => setTimeout(r, 50))
			el.style.top = e.pageY + 'px'
			el.style.left = e.pageX + 'px'
		})

		// // cursor
		// document.querySelectorAll('.cursor').forEach((el) => {
		// 	el.style.top = e.pageY + 'px'
		// 	el.style.left = e.pageX + 'px'
		// })

		// divs
		document.querySelectorAll('.el').forEach((el) => {
			if (stickSmile) {
				el.style.top = e.y + 'px'
				el.style.left = e.x + 'px'
			}
		})
	})

	// Menu
	let menu = document.querySelector('.atomjoy-menu')

	menu.addEventListener('mousemove', (e) => {
		menu.style.transform = 'translateX(-' + e.y / 5 + 'px)'
	})

	// Scale cursor
	let cursor = document.querySelector('.cursor-small')
	let cursorBorder = document.querySelector('.cursor-border')

	document.querySelectorAll('.cursor-scale').forEach((el) => {
		el.addEventListener(
			'mouseleave',
			(e) => {
				cursor.classList.remove('cursor-mix')
				cursorBorder.classList.remove('cursor-mix')
			},
			true
		)
		el.addEventListener(
			'mouseenter',
			(e) => {
				cursor.classList.add('cursor-mix')
				cursorBorder.classList.add('cursor-mix')
			},
			true
		)
	})

	document.querySelectorAll('.cursor-hide').forEach((el) => {
		el.addEventListener(
			'mouseleave',
			(e) => {
				cursor.classList.remove('cursor-mix-hide')
				cursorBorder.classList.remove('cursor-mix-hide')
			},
			true
		)
		el.addEventListener(
			'mousemove',
			(e) => {
				cursor.classList.add('cursor-mix-hide')
				cursorBorder.classList.add('cursor-mix-hide')
			},
			true
		)
	})

	document.querySelectorAll('.cursor-change').forEach((el) => {
		el.addEventListener(
			'mouseleave',
			(e) => {
				cursor.classList.remove('cursor-mix-change')
				cursorBorder.classList.remove('cursor-mix-change')
			},
			true
		)
		el.addEventListener(
			'mousemove',
			(e) => {
				cursor.classList.add('cursor-mix-change')
				cursorBorder.classList.add('cursor-mix-change')
			},
			true
		)
	})

	document.querySelectorAll('.cursor-change-contact').forEach((el) => {
		el.addEventListener(
			'mouseleave',
			(e) => {
				cursor.classList.remove('cursor-mix-change')
				cursorBorder.classList.remove('cursor-mix-change-contact')
			},
			true
		)
		el.addEventListener(
			'mousemove',
			(e) => {
				cursor.classList.add('cursor-mix-change')
				cursorBorder.classList.add('cursor-mix-change-contact')
			},
			true
		)
	})

	/* Gallery */
	let details = gsap.utils.toArray('.details')
	let props = gsap.getProperty('#id', 'backgroundColor')

	gsap.registerPlugin(ScrollTrigger)

	gsap.set('.photo:not(:first-child)', {
		opacity: 1,
		scale: 1,
		// y: '100%',
		clipPath: 'inset(100% 0% 0%)',
	})

	gsap.set('.photo img', {
		y: 5,
	})

	const animation = gsap.to('.photo:not(:first-child)', {
		// y: '0%',
		opacity: 1,
		scale: 1,
		duration: 1,
		stagger: 1,
		clipPath: 'inset(0% 0% 0%)',
		scale: 1,
		snap: true,
	})

	ScrollTrigger.create({
		trigger: '.gallery',
		start: 'top top',
		end: 'bottom bottom',
		pin: '.right',
		animation: animation,
		scrub: 2,
		// markers: true,
	})

	gsap.to('.photo img', {
		y: -5,
		duration: 1,
		repeat: -1,
		yoyo: true,
		ease: 'power1.inOut',
	})

	gsap.to('.gallery', {
		duration: 1,
		// backgroundColor: '#fff',
		scrollTrigger: {
			trigger: '.d1',
			scrub: true,
		},
	})

	gsap.to('.gallery', {
		duration: 1,
		// backgroundColor: '#fff',
		scrollTrigger: {
			trigger: '.d2',
			scrub: true,
		},
	})

	gsap.to('.gallery', {
		duration: 1,
		// backgroundColor: '#fff',
		scrollTrigger: {
			trigger: '.d3',
			scrub: true,
		},
	})

	gsap.to('.gallery', {
		duration: 1,
		// backgroundColor: '#fff',
		scrollTrigger: {
			trigger: '.d4',
			scrub: true,
		},
	})
}
