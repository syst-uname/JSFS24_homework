class Path {
  constructor(from, to, price, route = []) {
    this.from = from
    this.to = to
    this.price = +price
    this.route = route.length === 0 ? [from, to] : route
  }
}

class Traveling {

  constructor() {
    this._cities = []   // введеные города 
    this._citiesProcessed = []   // обработанные города 
    this._map = []      // введеные маршруты 
    this._start = ''    // откуда 
    this._finish = ''   // куда 
    this._prices = []   // рассчитаные цены
  }

  inputCities(input) {
    const data = input ? input : prompt("Список городов");
    this._cities = this._split(data)
    console.log('Введенные города: ' + this._cities.join(', '))
  }

  inputPrices(input) {
    const data = input ? input : prompt("Цены проезда");
    const inputPrices = this._split(data)
    for (const element of inputPrices) {
      const [from, to, price] = element.split(/[;=]{1}/);     // через ; и = 
      if (!from || !to || !price) {
        console.log(`Не удалось распознать цену маршрута "${element}"`)
        this._map = null
        return
      }
      this._map.push(new Path(from, to, price))
    }
    console.log('Введенные цены: ' + inputPrices.join('  '))
  }

  inputRoute(input) {
    const data = input ? input : prompt("Поиск маршрута");
    [this._start, this._finish] = data.split(';');
    if (!this._start || !this._finish) {  
      console.log(`Не удалось распознать маршрут "${data}"`)
      return null
    }
    console.log(`Введенный маршрут: поиск из ${this._start} в ${this._finish}`)
  }

  _split(input) {
    return input.split(/\s+/)   // новая строка или пробел 
  }

  // сканирование всех маршрутов 
  scan() {
    if (!this._cities || !this._map || !this._start || !this._finish) {
      console.log('Введены некорректные данные')
      return
    }
    this._findFrom(this._start, 0, [this._start])
  }

  // поиск из одного города во все доступные с учетом уже пройденного пути 
  _findFrom(city, price, route) {

    // считаем, что в городе уже побывали, если первый раз тут, иначе его не нужно обрабатывать 
    if (this._citiesProcessed.includes(city)) {
      return
    } else {
      this._citiesProcessed.push(city)
    }

    // ближайшие соседи
    const available = this._availablePath(city)

    // сохраняем, если новый путь короче 
    available.forEach(newPath => {       
      const [passed] = this._minPath(newPath.to)   // что там у нас уже сохранено по этому маршруту?
      if (passed) {
        if (passed.price > (newPath.price + price)) {   // новый найденный путь дешевле сохраненного
          passed.price = newPath.price + price
          passed.route = [...route, newPath.to]
          this._citiesProcessed.length = 0          // если какой-то маршрут обновился - то все города нужно пройти заново еще раз 
        }
      } else {              
        this._prices.push(new Path(this._start, newPath.to, newPath.price + price, [...route, newPath.to]))   // такого маршрута еще вовсе не было 
      } 
    })
     
    // и из каждого соседнего города нужно проверить его соседей пока все соседи не будут посещены        
    available.forEach(e => {
      const [passed] = this._minPath(e.to)   // свежая информация по соседнему городу
      this._findFrom(e.to, passed.price, passed.route)
    })
  }

  // в какие соседние города можно пройти из города 
  _availablePath(city) {
    return this._map.filter(e => e.from === city)
  }  

  // какой сейчас минимальный путь 
  _minPath(to) {
    return this._prices.filter(e => e.to === to)
  }

  print() {
    console.log('')
    console.log(' - Результат')
    this._prices
      .sort((a, b) => a.to > b.to ? 1 : -1)
      .forEach(e => {
      console.log(`Маршрут из ${e.from} в ${e.to} весит ${e.price}: ${this._routToText(e.route)}`,)
    })
    
    console.log('')
    console.log(' - Искомый маршрут')
    const [ result ] = this._prices.filter(e => e.to === this._finish)
    console.log(`Маршрут из ${this._start} в ${this._finish} ${ 
      result ? 
      `весит ${result.price}: ${this._routToText(result.route)}` 
      : ' не найден' }`)

  }

  _routToText(route) {
    return route.join(' -> ')
  }
} 




// тест 

// вариант1 
console.log(' - Выриант данных 1')
const travel1 = new Traveling()
travel1.inputCities('A B C D E') 
travel1.inputPrices('A;B=5 B;A=5 A;C=10 C;A=10 B;C=2 C;B=2 B;E=11 E;B=11 C;E=5 E;C=5 C;D=3 D;C=3 D;E=1 E;D=1')
travel1.inputRoute('A;E') 

travel1.scan()
travel1.print()

// вариант2
console.log('')
console.log('')
console.log(' - Выриант данных 2')
const travel2 = new Traveling()
travel2.inputCities('A B C D')
travel2.inputPrices('A;B=7 B;A=7 A;C=1 C;A=1 A;D=5 D;A=5 B;C=2 C;B=2 B;D=1 D;B=1 C;D=5 D;C=5')
travel2.inputRoute('A;D') 

travel2.scan()
travel2.print()
 

// вывод лога консоли:
// - Выриант данных 1
// Введенные города: A, B, C, D, E
// Введенные цены: A;B=5  B;A=5  A;C=10  C;A=10  B;C=2  C;B=2  B;E=11  E;B=11  C;E=5  E;C=5  C;D=3  D;C=3  D;E=1  E;D=1
// Введенный маршрут: поиск из A в E

//  - Результат
// Маршрут из A в A весит 10: A -> B -> A
// Маршрут из A в B весит 5: A -> B
// Маршрут из A в C весит 7: A -> B -> C
// Маршрут из A в D весит 10: A -> B -> C -> D
// Маршрут из A в E весит 11: A -> B -> C -> D -> E

//  - Искомый маршрут
// Маршрут из A в E весит 11: A -> B -> C -> D -> E


//  - Выриант данных 2
// Введенные города: A, B, C, D
// Введенные цены: A;B=7  B;A=7  A;C=1  C;A=1  A;D=5  D;A=5  B;C=2  C;B=2  B;D=1  D;B=1  C;D=5  D;C=5
// Введенный маршрут: поиск из A в D

//  - Результат
// Маршрут из A в A весит 2: A -> C -> A
// Маршрут из A в B весит 3: A -> C -> B
// Маршрут из A в C весит 1: A -> C
// Маршрут из A в D весит 4: A -> C -> B -> D

//  - Искомый маршрут
// Маршрут из A в D весит 4: A -> C -> B -> D
