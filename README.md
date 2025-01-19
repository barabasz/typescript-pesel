# PESEL

A very simple TypeScript class for validating [PESEL](https://en.wikipedia.org/wiki/PESEL) numbers - national identification numbers used in Poland since 1979. See 🇵🇱 Polish readme.

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

- `valid()` - _boolean_ on whether the PESEL is valid 
- `info()` - _string_ indicating whether the PESEL is valid 
- `date()` - _string_ in 'YYYY-MM-DD' format on valid PESEL, _null_ otherwise
- `error()` - _null_ on valid PESEL, _string_ with explanation of invalidity otherwise
- `json()` - _null_ on invalid PESEL, _string_ as JSON with all properties otherwise
- `print()` - _void_ print all properties to the console

## Properties

### Properties always present

- `value` - _string_: trimmed input value,
- `lang` - _string_: two-letter language,
- `isValid` - _boolean_: whether the PESEL is valid ,
- `verdict` - _string_: info on whether the PESEL is valid,

### Properties present on valid PESELs only

- `yearShort` - _string_: last two digits from year,
- `century` - _integer_: first two digits from year,
- `year` - _integer_: year from birthdate,
- `month` - ,
- `monthInt` - _integer_: month from birthdate,
- `monthName` - ,
- `day` - ,
- `dayInt` - _integer_: day from birthdate,
- `date` - _string_: birthdate in `YYYY-MM-DD` format,
- `dateLong` - _string_: birthdate in long date format,
- `dateObj` - `Date` object,
- `dow` - _integer_: day of week from birthdate (`0` = Sunday),
- `dowName` - _string_: day of week from birthdate,
- `serial` - _string_: serial number (including sex value),
- `sex` - _string_: sex (`male`/`female`),
- `sexName` - _string_: sex (male/female),
- `checksum` - _integer_: checksum (last digit),
- `info` - _string_: human-readable info on PESEL.

### Properties printed to the console

#### Valid PESEL

```javascript
PeselProperties {
  value: '29511300014',
  lang: 'en',
  isValid: true,
  verdict: 'the PESEL number is valid',
  yearShort: '29',
  century: 21,
  year: 2129,
  month: '11',
  monthInt: 11,
  monthName: 'November',
  day: '13',
  dayInt: 13,
  date: '2129-11-13',
  dateLong: 'November 13, 2129',
  dateObj: 2129-11-13T00:00:00.000Z,
  dow: 0,
  dowName: 'Sunday',
  serial: '0001',
  sex: 'male',
  sexName: 'man',
  checksum: 4,
  info: 'It is a man born on Sunday, November 13, 2129'
}
```

#### Invalid PESEL

```javascript
PeselProperties {
  value: '29513300014',
  lang: 'en',
  reason: 'incorrect date (2129-11-33)',
  isValid: false,
  verdict: 'the PESEL number is invalid'
}
```
