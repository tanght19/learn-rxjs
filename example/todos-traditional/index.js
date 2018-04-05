let list = [
	{
		text: '明天去春游',
		status: true
	},
	{
		text: '山本',
		status: false
	}
]

const biz = {
	init() {
		this.render()
		this.addEvents()
	},
	addEvents() {
		document.addEventListener('click', (e) => {
			const target    = e.target,
						classList = target.classList

			if (classList.contains('js-item')) {
				this.toggleStatus(classList)
			}

			if (classList.contains('js-btn-add')) {
				this.addItem()
			}

			if (classList.contains('js-remove')) {
				this.removeItem(target.parentNode.children[0].innerText)
			}
		}, false)

		document.addEventListener('keyup', (e) => {
			const target = e.target

			if (target.classList.contains('js-input') && e.keyCode === 13) {
				this.addItem()
			}
		}, false)
	},
	toggleStatus(classList) {
		classList.contains('cls-active') ? classList.remove('cls-active') : classList.add('cls-active')
	},
	addItem() {
		const input = document.querySelector('.js-input')

		if (!input.value || !input.value.trim() || list.some(item => item.text.trim() === input.value.trim())) {
			input.value = ''
			return false
		}

		list = list.concat({text: input.value.trim()})
		this.render()
	},
	removeItem(text) {
		list = list.filter(item => item.text !== text)
		this.render()
	},
	render() {
		const input = document.querySelector('.js-input')
		const container = document.querySelector('.js-task-box')
		const node = new DOMParser().parseFromString(this.getItem(list), 'text/html').body

		container.innerHTML = ''
		input.value = ''
		document.querySelector('.js-task-box').appendChild(node)
	},
	getItem(list) {
		const cls = list.status ? 'cls-active' : ''

		if (!list || list.length === 0) {
			return '<li class="list-group-item">当前没有任务</li>'
		}

		if (!Array.isArray(list)) {
			return `
			<li class="list-group-item">
				<span class="task-item js-item ${cls}">${list.text}</span> 
				<i class="icon-remove float-right js-remove">删除</i>
			</li>
			`
		}

		return list.map(item => this.getItem(item)).join('')
	}
}

biz.init()