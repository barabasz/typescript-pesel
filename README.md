# PESEL

A TypeScript class for validating [PESEL](https://en.wikipedia.org/wiki/PESEL) numbers - national identification numbers used in Poland since 1979.

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
console.log(p1.json());  // {get all properties as JSON}
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

- *valid()* - boolean
- info() - string
- date() - _string_ in 'YYYY-MM-DD' format on valid PESEL, _null_ otherwise
- error() - _null_ on valid PESEL, _string_ with explanation of invalidity otherwise
- json() - _null_ on invalid PESEL, _string_ as JSON with all properties otherwise
- print() - 

### printData

```typescript
p.printData();
```
print all properties in `console`.

## returnJson

```typescript
p.returnJson();
```

return all properties as JSON.

## Properties

All properties are kept in `pesel` object of `PeselProperties` class:

```json
{
  "value": "29511300014",
  "lang": "en",
  "isValid": true,
  "verdict": "the PESEL number is correct",
  "yearShort": "29",
  "century": 21,
  "year": 2129,
  "month": "11",
  "monthInt": 11,
  "monthName": "November",
  "day": "13",
  "dayInt": 13,
  "date": "2129-11-13",
  "dateLong": "November 13, 2129",
  "dateObj": "2129-11-13T00:00:00.000Z",
  "dow": 0,
  "dowName": "Sunday",
  "dowPrep": "on",
  "serial": "0001",
  "sex": "male",
  "sexName": "man",
  "verb": "born",
  "checksum": 4,
  "info": "It is a man born on Sunday, November 13, 2129"
}
```

### Example

```typescript
console.log(p.pesel.verdict);
```

output: `the PESEL number is correct`
