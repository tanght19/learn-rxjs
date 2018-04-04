const btnCount = document.querySelector('.js-count')
const btnTerminate = document.querySelector('.js-terminate')

const log = val => {
	console.log(val)
}

Rx.Observable.fromEvent(btnCount, 'click')
	.startWith(null)
	.throttle(250)
	.scan(count => count + 1, 0)
	.do(ev => console.log(ev))
	.subscribe()

Rx.Observable.interval(1000)
	.takeUntil(
		Rx.Observable.fromEvent(btnTerminate, 'click')
			.do(() => {
				console.log('stop after 3s')
			})
			.delay(3000)
			.do(() => {
				console.log('stoped')
			})
	)
	.do(log)
	.subscribe()


Rx.Observable.from([1, 2, 3, 4, 20, 30])
	.distinct()
	.takeLast(3)
	.do(ev => console.log(ev))
	.subscribe()

Rx.Observable.create(function (observer) {
		observer.next(1)
		observer.next(3)
		observer.next(4)

		setTimeout(function () {
			observer.next(6)
			observer.completed()
		})
	})
	.do(log)
	.subscribe()