var taskPartial = {
    id: 1,
    done: false,
};
var taskRequired = {
    id: 1,
    name: 'name1',
    done: false,
    value: 10, // Property 'value' is missing in type '{ id: number; name: string; done: false; }' but required in type 'TypeRequired<Task>'
};
var taskReadonly = {
    id: 1,
    name: 'name1',
    done: false,
};
var taskRecord = {
    Иванов: { id: 1, name: 'name1', done: false },
    Петров: { id: 2, name: 'name2', done: false },
    // Сидоров: {id: 2, name: 'name2', done: false },     // Object literal may only specify known properties, and 'Сидоров' does not exist in type 'TaskRecord'
};
var taskPick = {
    id: 1,
    name: 'name1',
    // done: true,     // Object literal may only specify known properties, and 'done' does not exist in type 'TaskPick'.         
};
var taskOmit = {
    id: 1,
    name: 'name1',
    // done: true,     // Object literal may only specify known properties, and 'done' does not exist in type 'TaskOmit'.     
};
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
