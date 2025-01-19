# PESEL

A TypeScript class for validating [PESEL](https://en.wikipedia.org/wiki/PESEL) numbers - national identification numbers used in Poland since 1979.

## Usage

```typescript
import {Pesel} from './Pesel.ts';
let pesel = '29511300014';
let language = 'en';
const p1 = new Pesel(pesel, language);

console.log(p.valid()); // _true_
console.log(p.info()); // 'the PESEL number is correct'
console.log(p.date()); // '2129-11-13'
console.log(p.error()); // null
```

## Methods

### isValid

```typescript
p.isValid();
```
output:

`true`

### info

```typescript
p.info();
```
output:

`The PESEL number is correct. It is a man born on Sunday, November 13, 2129.`

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
