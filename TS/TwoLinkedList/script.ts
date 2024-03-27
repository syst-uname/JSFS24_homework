type ItemValue = string
type ItemOrNull = Item | null

class Item {

  private value: ItemValue 
  private prev: ItemOrNull
  private next: ItemOrNull

  constructor(value: ItemValue) {
    this.value = value
    this.prev = null 
    this.next = null 
  }

  setPrev(item: ItemOrNull) {
    this.prev = item
  }

  getPrev() {
    return this.prev
  }

  setNext(item: ItemOrNull) {
    this.next = item
  }

  getNext() {
    return this.next
  }

  setValue(value: ItemValue) {
    this.value = value
  }

  getValue() {
    return this.value
  }
}

class TwoLinkedList {

  private first: ItemOrNull
  private last: ItemOrNull

  constructor() {
    this.first = null
    this.last = null
  }  

  getFirst() {
    return this.first
  }

  getLast() {
    return this.last
  }

  get(index: number) {
    const item = this._getItem(index)
    const value = item?.getValue()
    console.log(`${value ? `Элемент с индексом ${index}: ${value}` : `Элемента с индексом ${index} нет в списке`}`)
    return value
  }

  _getItem(index: number) {
    let currIndex = 1              
    if (index >= 0) {      
      let item = this.getFirst()    
      while (item) {
        if (currIndex === index) {
          return item
        }
        currIndex++ 
        item = item.getNext()
      }
      return null       
    } else {
      let item = this.getLast()    
      while (item) {
        if (currIndex === Math.abs(index) ) {
          return item
        }
        currIndex++ 
        item = item.getPrev()
      }
      return null 
    }
  }

  find(value: ItemValue) {
    let currIndex = 1              
    let item = this.getFirst()    
    while (item) {
      if (value === item.getValue()) {
        console.log(`Элемент со значением "${value}" находится в позици ${currIndex}`)
        return currIndex
      }
      currIndex++ 
      item = item.getNext()
    }
    console.log(`Элемента со значением "${value}" нет в списке`)
    return null       
  }

  length() {
    let count = 0
    let item = this.getFirst()  
    while (item) {
      count++ 
      item = item.getNext()
    }
    return count
  }

  push(value: ItemValue) {
    const item = new Item(value)
    if (this.last) {
      item.setPrev(this.last)
      this.last.setNext(item) 
    } else {
      this.first = item
    }
    this.last = item
    console.log(`Элемент "${value}" добавлен в конец списка`)
  }
  
  unshift(value: ItemValue) {
    const item = new Item(value)
    if (this.first) {
      item.setNext(this.first)       
      this.first.setPrev(item)
    } else {
      this.last = item
    }
    this.first = item
    console.log(`Элемент "${value}" добавлен в начало списка`)
  }

  pop() {
    if (this.last) {
      const value = this.last.getValue()
      const prev = this.last.getPrev()
      if (prev) {
        this.last.setPrev(null)
        this.last = prev
        prev.setNext(null)
      } else {
        this.first = null
        this.last = null
      }
      console.log(`Удаление последнего элемента: элемент ${value} удален`)
      return value
    } else {
      console.log(`Удаление последнего элемента: список пуст`)
      return null
    }
  }

  shift() {
    if (this.first) {
      const value = this.first.getValue()
      const next = this.first.getNext()
      if (next) {
        this.first.setNext(null)
        this.first = next
        next.setPrev(null)
      } else {
        this.first = null
        this.last = null
      }
      console.log(`Удаление первого элемента: элемент ${value} удален`)
      return value
    } else {
      console.log(`Удаление первого элемента: список пуст`)
      return null
    }
  }

  insert(index: number, value: ItemValue) { 
    const curr = this._getItem(index)
    if (!curr) {
      if (index === this.length() + 1) {    // вставка последним номером 
        this.push(value)
      } else {
        console.log(`Элемента с индексом ${index} нет в списке`)
      }
      return 
    }
    const prev = curr.getPrev()
    const ins = new Item(value)
    ins.setPrev(prev)
    ins.setNext(curr)
    curr.setPrev(ins)

    if (prev) {
      prev.setNext(ins)
      console.log(`Элемента "${value}" вставлен после элемента ${prev.getValue()} (индекс ${index})`)
    }
    else {
      this.first = ins
      console.log(`Элемента "${value}" вставлен первым (индекс ${index})`)
    }
  }

  delete(index: number) { 
    const del = this._getItem(index)
    if (!del) {
      console.log(`Элемента с индексом ${index} нет в списке`)
      return 
    }

    const prev = del.getPrev()
    const next = del.getNext()
  
    if (prev) 
      prev.setNext(next)
    else 
      this.first = next
  
    if (next)
      next.setPrev(prev)
    else
      this.last = prev

    del.setNext(null)
    del.setPrev(null)

    console.log(`Элемента "${del.getValue()}" удален (индекс ${index})`)
  }

  change(index: number, newValue: ItemValue) {
    const item = this._getItem(index)
    if (!item) {
      console.log(`Элемента с индексом ${index} нет в списке`)    
      return 
    }
    const oldValue = item.getValue()
    item.setValue(newValue)
    console.log(`В элементе ${index} значение "${oldValue}" изменено на "${newValue}"`)
  }

  print(direct = true) {     
    const values = direct ? this._getValuesDirect() : this._getValuesReverse() 
    const text = values.length === 0 ? 'Список пуст' : values.join(` -> `)          
    console.log(`${ direct ? 'Список' : 'Список в обратном порядке' }: ` + text)
  }

  _getValuesDirect() {     
    let values = []      
    let object = this.getFirst()
    while (object) {
      values.push(object.getValue())
      object = object.getNext()
    }
    return values
  }

  _getValuesReverse() {     
    let values = []      
    let object = this.getLast()
    while (object) {
      values.push(object.getValue())
      object = object.getPrev()
    }
    return values
  }
}




// запуск теста
const list = new TwoLinkedList()
console.log(`- Наполнение списка`)
console.log(`Длина списка: ${list.length()}`)

list.push('A')     
list.push('B')
list.push('C')
console.log(`Длина списка: ${list.length()}`)
list.print()

list.push('D')
list.print()

list.unshift('1')
list.print()
console.log(`Длина списка: ${list.length()}`)   

list.print(false)

console.log(``)
console.log(`- Поиск по индексу`)
list.get(0)
list.get(1)
list.get(3)
list.get(-3)
list.get(-1)
list.get(100)

console.log(``)
console.log(`- Поиск по значению`)
list.print()
list.find('A')
list.find('1')
list.find('D')
list.find('999')

console.log(``)
console.log(`- Вставка по индексу`)
list.print()

list.insert(3, 'new1')
list.print()

list.insert(10, 'new2')
list.print()

list.insert(1, 'new3')
list.print()

console.log(`Длина списка: ${list.length()}`)   
list.insert(8, 'new4')
list.print()

console.log(``)
console.log(`- Изменение по индексу`)
list.print()
list.change(4, 'new value')
list.print()
list.change(44, 'new value')
list.print()
list.change(1, 'first')
list.print()


console.log(``)
console.log(`- Удаление последнего элемента`)
list.print()
list.pop()
list.pop()
list.print()
list.print(false)

console.log(``)
console.log(`- Удаление первого элемента`)
list.print()
list.shift()
list.shift()
list.print()
list.print(false)

console.log(``)
console.log(`- Удаление по индексу`)
list.print()
list.delete(2)
list.print()
list.delete(20)
list.delete(1)
list.print()
list.print(false)
list.delete(2)
list.print()
list.print(false)
list.delete(1)
list.print()
list.delete(1) 
list.delete(0)
list.print()


// вывод лога консоли: 
// - Наполнение списка
// Длина списка: 0
// Элемент "A" добавлен в конец списка
// Элемент "B" добавлен в конец списка
// Элемент "C" добавлен в конец списка
// Длина списка: 3
// Список: A -> B -> C
// Элемент "D" добавлен в конец списка
// Список: A -> B -> C -> D
// Элемент "1" добавлен в начало списка
// Список: 1 -> A -> B -> C -> D
// Длина списка: 5
// Список в обратном порядке: D -> C -> B -> A -> 1

// - Поиск по индексу
// Элемента с индексом 0 нет в списке
// Элемент с индексом 1: 1
// Элемент с индексом 3: B
// Элемент с индексом -3: B
// Элемент с индексом -1: D
// Элемента с индексом 100 нет в списке

// - Поиск по значению
// Список: 1 -> A -> B -> C -> D
// Элемент со значением "A" находится в позици 2
// Элемент со значением "1" находится в позици 1
// Элемент со значением "D" находится в позици 5
// Элемента со значением "999" нет в списке

// - Вставка по индексу
// Список: 1 -> A -> B -> C -> D
// Элемента "new1" вставлен после элемента A (индекс 3)
// Список: 1 -> A -> new1 -> B -> C -> D
// Элемента с индексом 10 нет в списке
// Список: 1 -> A -> new1 -> B -> C -> D
// Элемента "new3" вставлен первым (индекс 1)
// Список: new3 -> 1 -> A -> new1 -> B -> C -> D
// Длина списка: 7
// Элемент "new4" добавлен в конец списка
// Список: new3 -> 1 -> A -> new1 -> B -> C -> D -> new4

// - Изменение по индексу
// Список: new3 -> 1 -> A -> new1 -> B -> C -> D -> new4
// В элементе 4 значение "new1" изменено на "new value"
// Список: new3 -> 1 -> A -> new value -> B -> C -> D -> new4
// Элемента с индексом 44 нет в списке
// Список: new3 -> 1 -> A -> new value -> B -> C -> D -> new4
// В элементе 1 значение "new3" изменено на "first"
// Список: first -> 1 -> A -> new value -> B -> C -> D -> new4

// - Удаление последнего элемента
// Список: first -> 1 -> A -> new value -> B -> C -> D -> new4
// Удаление последнего элемента: элемент new4 удален
// Удаление последнего элемента: элемент D удален
// Список: first -> 1 -> A -> new value -> B -> C
// Список в обратном порядке: C -> B -> new value -> A -> 1 -> first

// - Удаление первого элемента
// Список: first -> 1 -> A -> new value -> B -> C
// Удаление первого элемента: элемент first удален
// Удаление первого элемента: элемент 1 удален
// Список: A -> new value -> B -> C
// Список в обратном порядке: C -> B -> new value -> A

// - Удаление по индексу
// Список: A -> new value -> B -> C
// Элемента "new value" удален (индекс 2)
// Список: A -> B -> C
// Элемента с индексом 20 нет в списке
// Элемента "A" удален (индекс 1)
// Список: B -> C
// Список в обратном порядке: C -> B
// Элемента "C" удален (индекс 2)
// Список: B
// Список в обратном порядке: B
// Элемента "B" удален (индекс 1)
// Список: Список пуст
// Элемента с индексом 1 нет в списке
// Элемента с индексом 0 нет в списке
// Список: Список пуст