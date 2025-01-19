# PESEL

A very simple TypeScript class for validating [PESEL](https://en.wikipedia.org/wiki/PESEL) numbers - national identification numbers used in Poland since 1979.

## Usage

```typescript
import {Pesel} from './Pesel.ts';
let language = 'en';

// valid PESEL
let pesel = '29511300014';
const p1 = new Pesel.Pesel(pesel, language);

console.log(p1.valid()); // true
console.log(p1.info());  // 'the PESEL number is correct'
console.log(p1.date());  // '2129-11-13'
console.log(p1.error()); // null
console.log(p1.json());  // {string as JSON with  all properties}
p1.print();              // print all properties to the console


// invalid PESEL
pesel = '29513300014';
const p2 = new Pesel.Pesel(pesel, language);

console.log(p2.valid()); // true
console.log(p2.info());  // 'the PESEL number is correct'
console.log(p2.date());  // '2129-11-13'
console.log(p2.error()); // null
```

## Methods

- **valid()otherwise - boolean
- **info()** - _string_ indicating whether the PESEL is valid 
- **date()** - _string_ in 'YYYY-MM-DD' format on valid PESEL, _null_ otherwise
- **error()** - _null_ on valid PESEL, _string_ with explanation of invalidity otherwise
- **json()** - _null_ on invalid PESEL, _string_ as JSON with all properties otherwise
- **print()** - _void_ print all properties to the console

## Properties

