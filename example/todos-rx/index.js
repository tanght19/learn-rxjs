const log = console.log.bind(console)

const todos = {
  list() {
    return fetch('/todos/').then(resp => resp.json())
  }
}

const biz = {
  init() {
    const $input = document.querySelector('.js-input')
    const $btnAdd = document.querySelector('.js-add')
    const $container = document.querySelector('.js-task-box')

    const $stream = Rx.Observable.fromEvent($btnAdd, 'click')
    .merge(
      Rx.Observable.fromEvent($input, 'keyup')
      .filter(e => e.keyCode === 13)
    )
    .debounce(200)
    .map(() => $input.value)
    .distinct()
    .filter(val => val.trim() !== '')
    .map(text => ({text, status: false}))
    .merge(this.queryStream())
    .map(item => {
      const ele = document.createElement('li')
      ele.classList.add('list-group-item')
      ele.innerHTML = this.createItemStr(item)
      return ele
    })
    .do($item => {
      $container.appendChild($item)
      $input.value = ''
    })
    .replay(1)  // why?
    .refCount()

    Rx.Observable.merge(
      $stream.mergeMap(this.toggleStream),
      $stream.mergeMap(this.removeStream)
    )
    .subscribe()
  },
  queryStream(){
    const $btnRefresh = document.querySelector('.js-refresh')

    return Rx.Observable.fromEvent($btnRefresh, 'click')
    .startWith(null)
    .debounce(150)
    .flatMapLatest(() => Rx.Observable.fromPromise(todos.list()))
    .flatMap(Rx.Observable.from)
  },
  toggleStream($item) {
    const $target = $item.querySelector('.js-item')

    return Rx.Observable.fromEvent($target, 'click')
    .map(e => e.target.classList)
    .do((classList) => {
      classList.contains('cls-active') ? classList.remove('cls-active') : classList.add('cls-active')
    })
  },
  removeStream($item) {
    const $remove = $item.querySelector('.js-remove')

    return Rx.Observable.fromEvent($remove, 'click')
    .do(() => {
      $item.parentNode.removeChild($item)
    })
  },
  createItemStr(item) {
    const cls = item.status ? 'cls-active' : ''
    return `
				<span class="task-item js-item ${cls}">${item.text}</span> 
				<i class="icon-remove float-right js-remove">删除</i>
		`
  }
}

biz.init()
