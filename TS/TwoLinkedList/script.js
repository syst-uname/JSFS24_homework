var Item = /** @class */ (function () {
    function Item(value) {
        this.value = value;
        this.prev = null;
        this.next = null;
    }
    Item.prototype.setPrev = function (item) {
        this.prev = item;
    };
    Item.prototype.getPrev = function () {
        return this.prev;
    };
    Item.prototype.setNext = function (item) {
        this.next = item;
    };
    Item.prototype.getNext = function () {
        return this.next;
    };
    Item.prototype.setValue = function (value) {
        this.value = value;
    };
    Item.prototype.getValue = function () {
        return this.value;
    };
    return Item;
}());
var TwoLinkedList = /** @class */ (function () {
    function TwoLinkedList() {
        this.first = null;
        this.last = null;
    }
    TwoLinkedList.prototype.getFirst = function () {
        return this.first;
    };
    TwoLinkedList.prototype.getLast = function () {
        return this.last;
    };
    TwoLinkedList.prototype.get = function (index) {
        var item = this._getItem(index);
        var value = item === null || item === void 0 ? void 0 : item.getValue();
        console.log("".concat(value ? "\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441 \u0438\u043D\u0434\u0435\u043A\u0441\u043E\u043C ".concat(index, ": ").concat(value) : "\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0441 \u0438\u043D\u0434\u0435\u043A\u0441\u043E\u043C ".concat(index, " \u043D\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435")));
        return value;
    };
    TwoLinkedList.prototype._getItem = function (index) {
        var currIndex = 1;
        if (index >= 0) {
            var item = this.getFirst();
            while (item) {
                if (currIndex === index) {
                    return item;
                }
                currIndex++;
                item = item.getNext();
            }
            return null;
        }
        else {
            var item = this.getLast();
            while (item) {
                if (currIndex === Math.abs(index)) {
                    return item;
                }
                currIndex++;
                item = item.getPrev();
            }
            return null;
        }
    };
    TwoLinkedList.prototype.find = function (value) {
        var currIndex = 1;
        var item = this.getFirst();
        while (item) {
            if (value === item.getValue()) {
                console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u043C \"".concat(value, "\" \u043D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 \u043F\u043E\u0437\u0438\u0446\u0438 ").concat(currIndex));
                return currIndex;
            }
            currIndex++;
            item = item.getNext();
        }
        console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0441\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u043C \"".concat(value, "\" \u043D\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435"));
        return null;
    };
    TwoLinkedList.prototype.length = function () {
        var count = 0;
        var item = this.getFirst();
        while (item) {
            count++;
            item = item.getNext();
        }
        return count;
    };
    TwoLinkedList.prototype.push = function (value) {
        var item = new Item(value);
        if (this.last) {
            item.setPrev(this.last);
            this.last.setNext(item);
        }
        else {
            this.first = item;
        }
        this.last = item;
        console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \"".concat(value, "\" \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043A\u043E\u043D\u0435\u0446 \u0441\u043F\u0438\u0441\u043A\u0430"));
    };
    TwoLinkedList.prototype.unshift = function (value) {
        var item = new Item(value);
        if (this.first) {
            item.setNext(this.first);
            this.first.setPrev(item);
        }
        else {
            this.last = item;
        }
        this.first = item;
        console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442 \"".concat(value, "\" \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u043D\u0430\u0447\u0430\u043B\u043E \u0441\u043F\u0438\u0441\u043A\u0430"));
    };
    TwoLinkedList.prototype.pop = function () {
        if (this.last) {
            var value = this.last.getValue();
            var prev = this.last.getPrev();
            if (prev) {
                this.last.setPrev(null);
                this.last = prev;
                prev.setNext(null);
            }
            else {
                this.first = null;
                this.last = null;
            }
            console.log("\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430: \u044D\u043B\u0435\u043C\u0435\u043D\u0442 ".concat(value, " \u0443\u0434\u0430\u043B\u0435\u043D"));
            return value;
        }
        else {
            console.log("\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430: \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0441\u0442");
            return null;
        }
    };
    TwoLinkedList.prototype.shift = function () {
        if (this.first) {
            var value = this.first.getValue();
            var next = this.first.getNext();
            if (next) {
                this.first.setNext(null);
                this.first = next;
                next.setPrev(null);
            }
            else {
                this.first = null;
                this.last = null;
            }
            console.log("\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430: \u044D\u043B\u0435\u043C\u0435\u043D\u0442 ".concat(value, " \u0443\u0434\u0430\u043B\u0435\u043D"));
            return value;
        }
        else {
            console.log("\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430: \u0441\u043F\u0438\u0441\u043E\u043A \u043F\u0443\u0441\u0442");
            return null;
        }
    };
    TwoLinkedList.prototype.insert = function (index, value) {
        var curr = this._getItem(index);
        if (!curr) {
            if (index === this.length() + 1) { // вставка последним номером 
                this.push(value);
            }
            else {
                console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0441 \u0438\u043D\u0434\u0435\u043A\u0441\u043E\u043C ".concat(index, " \u043D\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435"));
            }
            return;
        }
        var prev = curr.getPrev();
        var ins = new Item(value);
        ins.setPrev(prev);
        ins.setNext(curr);
        curr.setPrev(ins);
        if (prev) {
            prev.setNext(ins);
            console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \"".concat(value, "\" \u0432\u0441\u0442\u0430\u0432\u043B\u0435\u043D \u043F\u043E\u0441\u043B\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 ").concat(prev.getValue(), " (\u0438\u043D\u0434\u0435\u043A\u0441 ").concat(index, ")"));
        }
        else {
            this.first = ins;
            console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \"".concat(value, "\" \u0432\u0441\u0442\u0430\u0432\u043B\u0435\u043D \u043F\u0435\u0440\u0432\u044B\u043C (\u0438\u043D\u0434\u0435\u043A\u0441 ").concat(index, ")"));
        }
    };
    TwoLinkedList.prototype.delete = function (index) {
        var del = this._getItem(index);
        if (!del) {
            console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0441 \u0438\u043D\u0434\u0435\u043A\u0441\u043E\u043C ".concat(index, " \u043D\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435"));
            return;
        }
        var prev = del.getPrev();
        var next = del.getNext();
        if (prev)
            prev.setNext(next);
        else
            this.first = next;
        if (next)
            next.setPrev(prev);
        else
            this.last = prev;
        del.setNext(null);
        del.setPrev(null);
        console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \"".concat(del.getValue(), "\" \u0443\u0434\u0430\u043B\u0435\u043D (\u0438\u043D\u0434\u0435\u043A\u0441 ").concat(index, ")"));
    };
    TwoLinkedList.prototype.change = function (index, newValue) {
        var item = this._getItem(index);
        if (!item) {
            console.log("\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0441 \u0438\u043D\u0434\u0435\u043A\u0441\u043E\u043C ".concat(index, " \u043D\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435"));
            return;
        }
        var oldValue = item.getValue();
        item.setValue(newValue);
        console.log("\u0412 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0435 ".concat(index, " \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \"").concat(oldValue, "\" \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u043D\u0430 \"").concat(newValue, "\""));
    };
    TwoLinkedList.prototype.print = function (direct) {
        if (direct === void 0) { direct = true; }
        var values = direct ? this._getValuesDirect() : this._getValuesReverse();
        var text = values.length === 0 ? 'Список пуст' : values.join(" -> ");
        console.log("".concat(direct ? 'Список' : 'Список в обратном порядке', ": ") + text);
    };
    TwoLinkedList.prototype._getValuesDirect = function () {
        var values = [];
        var object = this.getFirst();
        while (object) {
            values.push(object.getValue());
            object = object.getNext();
        }
        return values;
    };
    TwoLinkedList.prototype._getValuesReverse = function () {
        var values = [];
        var object = this.getLast();
        while (object) {
            values.push(object.getValue());
            object = object.getPrev();
        }
        return values;
    };
    return TwoLinkedList;
}());
// запуск теста
var list = new TwoLinkedList();
console.log("- \u041D\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0441\u043F\u0438\u0441\u043A\u0430");
console.log("\u0414\u043B\u0438\u043D\u0430 \u0441\u043F\u0438\u0441\u043A\u0430: ".concat(list.length()));
list.push('A');
list.push('B');
list.push('C');
console.log("\u0414\u043B\u0438\u043D\u0430 \u0441\u043F\u0438\u0441\u043A\u0430: ".concat(list.length()));
list.print();
list.push('D');
list.print();
list.unshift('1');
list.print();
console.log("\u0414\u043B\u0438\u043D\u0430 \u0441\u043F\u0438\u0441\u043A\u0430: ".concat(list.length()));
list.print(false);
console.log("");
console.log("- \u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0438\u043D\u0434\u0435\u043A\u0441\u0443");
list.get(0);
list.get(1);
list.get(3);
list.get(-3);
list.get(-1);
list.get(100);
console.log("");
console.log("- \u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044E");
list.print();
list.find('A');
list.find('1');
list.find('D');
list.find('999');
console.log("");
console.log("- \u0412\u0441\u0442\u0430\u0432\u043A\u0430 \u043F\u043E \u0438\u043D\u0434\u0435\u043A\u0441\u0443");
list.print();
list.insert(3, 'new1');
list.print();
list.insert(10, 'new2');
list.print();
list.insert(1, 'new3');
list.print();
console.log("\u0414\u043B\u0438\u043D\u0430 \u0441\u043F\u0438\u0441\u043A\u0430: ".concat(list.length()));
list.insert(8, 'new4');
list.print();
console.log("");
console.log("- \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u043E \u0438\u043D\u0434\u0435\u043A\u0441\u0443");
list.print();
list.change(4, 'new value');
list.print();
list.change(44, 'new value');
list.print();
list.change(1, 'first');
list.print();
console.log("");
console.log("- \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430");
list.print();
list.pop();
list.pop();
list.print();
list.print(false);
console.log("");
console.log("- \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430");
list.print();
list.shift();
list.shift();
list.print();
list.print(false);
console.log("");
console.log("- \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u043E \u0438\u043D\u0434\u0435\u043A\u0441\u0443");
list.print();
list.delete(2);
list.print();
list.delete(20);
list.delete(1);
list.print();
list.print(false);
list.delete(2);
list.print();
list.print(false);
list.delete(1);
list.print();
list.delete(1);
list.delete(0);
list.print();
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
