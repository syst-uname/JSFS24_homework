// тип для примеров 
interface Task {
  id: number, 
  name: string, 
  done: boolean, 
  value?: number, 
}


// Partial<Type> - все поля типа не обязательные 
type TypePartial<T> = {
  [P in keyof T]?: T[P];
}

// пример 
type TaskPartial = TypePartial<Task>
const taskPartial: TaskPartial = {  
  id: 1,
  done: false,
}
 

// Required<Type> - все поля обязательные 
type TypeRequired<T> = {
  [P in keyof T]-?: T[P]
}

type TaskRequired = TypeRequired<Task>
const taskRequired: TaskRequired = {  
  id: 1,
  name: 'name1',  
  done: false,
  value: 10,    // Property 'value' is missing in type '{ id: number; name: string; done: false; }' but required in type 'TypeRequired<Task>'
}


// Readonly<Type> - все поля только для чтения  
type TypeReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

type TaskReadonly = TypeReadonly<Task>
const taskReadonly: TaskReadonly = {  
  id: 1,
  name: 'name1',  
  done: false,   
}
// taskReadonly.name = 'name2'    // Cannot assign to 'name' because it is a read-only property.


// Record<Keys, Type>
type TypeRecord<K extends keyof any, T> = {
  [P in K]: T
}

type TaskRecord = TypeRecord<'Иванов' | 'Петров', Task>
const taskRecord: TaskRecord = {  
  Иванов: {id: 1, name: 'name1', done: false },
  Петров: {id: 2, name: 'name2', done: false },
  // Сидоров: {id: 2, name: 'name2', done: false },     // Object literal may only specify known properties, and 'Сидоров' does not exist in type 'TaskRecord'
}



// Pick<Type, Keys> - часть полей типа
type TypePick<T, K extends keyof T> = {
  [P in K]: T[P];   
};

type TaskPick = TypePick<Task, 'id' | 'name'> 
const taskPick: TaskPick = {  
  id: 1,           
  name: 'name1',           
  // done: true,     // Object literal may only specify known properties, and 'done' does not exist in type 'TaskPick'.         
}


// Exclude<UnionType, ExcludedMembers>
type TypeExclude<T, U> = T extends U ? never : T;

type TaskExclude = TypeExclude<'id' | 'name' | 'value', 'value'> 
 


// Omit<Type, Keys> - опускаем некоторые поля типа 
type TypeOmit<T, K extends keyof T> = {
  [P in TypeExclude<keyof T, K>]: T[P];
}

type TaskOmit = TypeOmit<Task, 'done' | 'value'> 
const taskOmit: TaskOmit = {  
  id: 1,           
  name: 'name1',           
  // done: true,     // Object literal may only specify known properties, and 'done' does not exist in type 'TaskOmit'.     
}


// Свой тип
interface Line {
  cell1: string, 
  cell2: string, 
  cell3: string, 
}

// Matrix<Type> - поле 3 на 3 в крестики-нолики 
type TypeMatrix<T> = {
  [P in keyof T]: T
}

type matrix = TypeMatrix<Line>





//  type AliasType = { 
//   f1: number; 
//   f2: string 
// };

// interface IInterfaceType {
//   f1: number;
//   f2: string;
//   f3: boolean;
// }

// class ClassType {
//   f1: number;
//   f2: string;
//   f4: [];
// }

// let v1: keyof AliasType; // v1: "f1" | "f2"
// let v2: keyof IInterfaceType; // v2: "f1" | "f2" | "f3"
// let v3: keyof ClassType; // v3: "f1" | "f2" | "f4"

// let v5: ClassType['f4']

// v1 = "f1"
// v2 = "f2"
// v3 = "f4"