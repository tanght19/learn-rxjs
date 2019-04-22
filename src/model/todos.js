let list = [
  {
    id: 1,
    text: '明天去春游',
    status: true
  },
  {
    id: 2,
    text: '山本',
    status: false
  }
]

const todos = {
  list(id) {
    if(id){
      const target = list.find(item => id === item.id) 

      return target
    }

    return list
  },
  add(text) {
    list = list.concat({id: list.length, text: text.trim(), status: false})
  },
  remove(text) {
    list = list.filter(item => item.text !== text)
  },
  edit(id, newText){
    list.find(item => +item.id === +id).text = newText
  }
}

module.exports = todos
