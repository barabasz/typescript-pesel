import {Pesel} from './Pesel';
let language = 'en';

// valid PESEL
let pesel = '29511300014';
const p1 = new Pesel.Pesel(pesel, language);

console.log(p1.valid()); // true
console.log(p1.info());  // 'the PESEL number is correct'
console.log(p1.date());  // '2129-11-13'
console.log(p1.error()); // null

// invalid PESEL
pesel = '29513300014';
const p2 = new Pesel.Pesel(pesel, language);

console.log(p2.valid()); // true
console.log(p2.info());  // 'the PESEL number is correct'
console.log(p2.date());  // '2129-11-13'
console.log(p2.error()); // null
p2.print(); 

// all properties (for valid PESEL)
console.log(p1.json());  // {get all properties as JSON}
p1.print();              // print all properties to the console
