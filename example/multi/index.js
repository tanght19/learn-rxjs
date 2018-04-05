const log = (val, desc = '') => console.log(desc + ' ' + val)
const createLog = desc => val => log(val, desc)

const stream = Rx.Observable.from([1,2,3,4])

// observable has two observer, does't work as expected
// stream.map(val => val * 10).scan((sum, curr) => sum + curr, 0).do(log).subscribe()
// stream.do(log).subscribe()


// subject
const subject = new Rx.Subject()

subject.subscribe(createLog('Subject a is'))
subject.subscribe(createLog('Subject b is'))
subject.subscribe(createLog('Subject c is'))

subject.onNext(1)
subject.onNext(2)
subject.onNext(3)

Rx.Observable.range(1, 5).subscribe(subject)