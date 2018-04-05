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

const log = val => console.log(val)

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
    .map(() => $input.value)
    .distinctUntilChanged()
    .filter(val => val.trim() !== '')
    .throttle(200)
    .map(text => ({text, status: false}))
    .merge(Rx.Observable.from(list))
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

    $stream.mergeMap(this.toggleStream)
    .merge($stream.mergeMap(this.removeStream))
    .subscribe()
  },
  removeStream($item) {
    const $remove = $item.querySelector('.js-remove')

    return Rx.Observable.fromEvent($remove, 'click')
    .do(() => {
      $item.parentNode.removeChild($item)
    })
  },
  toggleStream($item){
    const $target = $item.querySelector('.js-item')

    return Rx.Observable.fromEvent($target, 'click')
    .map(e => e.target.classList)
    .do((classList) => {
      classList.contains('cls-active') ? classList.remove('cls-active') : classList.add('cls-active')
    })
    .map(() => $item)
  },
  createItemStr(item){
    const cls = item.status ? 'cls-active' : ''
    return `
				<span class="task-item js-item ${cls}">${item.text}</span> 
				<i class="icon-remove float-right js-remove">删除</i>
		`
  }
}

biz.init()
