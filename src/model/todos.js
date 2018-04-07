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
      return list.find(item => id === item.id)
    }

    return list
  },
  add(text) {
    list = list.concat({id: list.length, text: text.trim(), status: false})
  },
  remove(text) {
    list = list.filter(item => item.text !== text)
  },
  update(newItem) {
    list = list.map(item => {
      if (newItem.id === item.id) {
        return {
          ...item,
          newItem
        }
      }

      return item
    })
  }
}

module.exports = todos
