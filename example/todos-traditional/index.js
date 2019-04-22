const biz = {
  init() {
    this.render()
    this.addEvents()
  },
  addEvents() {
    document.addEventListener('click', (e) => {
      let target = e.target,
            classList = target.classList

      while(target !== document && !target.classList.contains('fn-todo-item')){
        target = target.parentNode
      }      

      if (classList.contains('js-item')) {
        this.toggleStatus(classList)
      }

      if (classList.contains('js-add')) {
        this.addItem()
      }

      if (classList.contains('js-edit')) {
        this.toggleToEdit(target)
      }

      if (classList.contains('js-remove')) {
        this.removeItem(+target.dataset.id)
      }
    }, false)

    document.addEventListener('keyup', (e) => {
      let target = e.target
   
      if(e.keyCode === 13){
        if (target.classList.contains('js-input')) {
          return this.addItem()
        }

        if(target.classList.contains('js-input-item')) {
          this.editInputSubmit(target)
        }
      }
    }, false)
  },
  toggleStatus(classList) {
    classList.contains('cls-active') ? classList.remove('cls-active') : classList.add('cls-active')
  },
  async editInputSubmit(target) {
    const input = target 
    const span = input.parentNode.querySelector('.js-item')
    let row = target 

    while(row !== document && !row.classList.contains('fn-todo-item')){
      row = row.parentNode
    }      

    await $.ajax({url: `/todos/${row.dataset.id}`, method: 'put', data: {text: input.value}})
    span.innerText = row.dataset.text = input.value
    input.classList.add('fn-hide')
    span.classList.remove('fn-hide')
  },
  async addItem() {
    const input = document.querySelector('.js-input')
    const list = await $.get('/todos/')

    if (!input.value || !input.value.trim() || list.some(item => item.text.trim() === input.value.trim())) {
      input.value = ''
      return false
    }

    await $.post('/todos/', {text: input.value})
    this.render()
    input.value = ''
  },
  toggleToEdit(row){
    const input = row.querySelector('input')
    const item = row.querySelector('.js-item')

    input.classList.remove('fn-hide')
    item.classList.add('fn-hide')
    input.focus()

    setTimeout(() => {
      input.selectionStart = input.selectionEnd = input.value.length
    }, 0)
  },
  async removeItem(id) {
    await $.ajax({url: `/todos/${id}`, type: 'delete'})
    this.render()
  },
  async render() {
    const input = document.querySelector('.js-input')
    const container = document.querySelector('.js-task-box')
    const list = await $.get('/todos/')
    container.innerHTML = this.getItem(list)
  },
  getItem(list) {
    const cls = list.status ? 'cls-active' : ''

    if (!list || list.length === 0) {
      return '<li class="list-group-item">当前没有任务</li>'
    }

    if (!Array.isArray(list)) {
      let item  = list
      return `
			<li class="list-group-item list-group-flush fn-todo-item row" data-id="${item.id}">
        <div class="col col-10">
          <span class="task-item js-item ${cls}">${item.text}</span> 
          <input type="text" value="${item.text}" class="form-control js-input-item fn-hide">
        </div> 
        <div class="col col-2">
          <i class="icon-remove js-edit">编辑</i>
          <i class="icon-remove js-remove">删除</i>
        </div> 
			</li>
			`
    }

    return list.map(item => this.getItem(item)).join('')
  }
}

biz.init()
