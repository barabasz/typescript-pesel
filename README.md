# PESEL

A very simple TypeScript class for validating [PESEL](https://en.wikipedia.org/wiki/PESEL) numbers - national identification numbers used in Poland since 1979. This class has no external dependencies.

The PESEL number supports birthdays from `1800-01-01` to `2299-12-31` (`YYYY-MM-DD`), contains a serial number, information on the gender of the born person and a checksum.

🇵🇱 Zobacz [readme w języku polskim](README_pl.md).

## Usage

```typescript
import {Pesel} from './Pesel.ts';
let language = 'en';      // supported languages: 'en' (English) and 'pl' (Polish)

// valid PESEL
let pesel = '29511300014';
const p1 = new Pesel.Check(pesel, language);

console.log(p1.valid());   // true
console.log(p1.verdict()); // 'the PESEL number is valid ✅....'
console.log(p1.info());    // 'It is a man born on Sunday, November 13, 2129'
console.log(p1.date());    // '2129-11-13'
console.log(p1.error());   // null

// invalid PESEL
pesel = '29513300014';
const p2 = new Pesel.Check(pesel, language);

console.log(p2.valid());   // false
console.log(p1.verdict()); // 'the PESEL number is invalid ⛔'
console.log(p2.info());    // null
console.log(p2.date());    // null
console.log(p2.error());   // 'incorrect date (2129-11-33)'
```

You can also:

```typescript
console.log(p1.json());    // {get string as JSON with all properties}
p1.print();                // print all properties to the console
```

## Methods

The [Pesel](./bin/Pesel.ts) class has the following public methods:

- `date()` - _string_ in 'YYYY-MM-DD' format on valid PESEL or _null_ otherwise,
- `error()` - _null_ on valid PESEL, _string_ with explanation of invalidity otherwise,
- `verdict()` - _string_: human-readable message whether the PESEL is valid,
- `info()` - _string_: human-readable message on person with this PESEL,
- `json()` - _string_ as JSON with all properties on valid PESEL or _null_ otherwise,
- `print()` - _void_ print all properties to the console,
- `valid()` - _boolean_: whether the PESEL is valid.

## Properties

The [PeselProperties](./bin/Pesel.ts) class has the following properties:

### Properties always present

- `icon` - _string_: ✅ or ⛔,
- `isValid` - _boolean_: whether the PESEL is valid,
- `lang` - _string_: two-letter language,
- `value` - _string_: trimmed input value,
- `verdict` - _string_: info on whether the PESEL is valid.

### Properties additionally present on invalid PESELs only

- `error` - _string_: Validation error cause

### Properties additionally present on valid PESELs only

- `century` - _integer_: first two digits from year,
- `checksum` - _integer_: checksum (last digit),
- `dateLong` - _string_: birthdate in long date format,
- `dateObj` - `Date` object,
- `date` - _string_: birthdate in `YYYY-MM-DD` format,
- `dayInt` - _integer_: day from birthdate,
- `day` - _string_: two-digits day from birthdate,
- `dowName` - _string_: day of week from birthdate,
- `dow` - _integer_: day of week from birthdate (`0` = Sunday),
- `icon` - _string_: ✅ or ⛔whether the PESEL is valid,
- `info` - _string_: human-readable info on PESEL,
- `monthInt` - _integer_: month from birthdate,
- `monthName` - _string_: name of the month from birthdate,
- `month` - , _string_: month from birthdate,
- `serial` - _string_: serial number (including sex value),
- `sexName` - _string_: sex (male/female),
- `sex` - _string_: sex (`male`/`female`),
- `yearShort` - _string_: last two digits from year,
- `year` - _integer_: year from birthdate.

### Properties printed to the console

#### Valid PESEL

```javascript
let PeselProperties =  {
    century: 21,
    checksum: 4,
    date: '2129-11-13',
    dateLong: 'November 13, 2129',
    dateObj: '2129-11-13T00:00:00.000Z',
    day: '13',
    dayInt: 13,
    dow: 0,
    dowName: 'Sunday',
    icon: '✅',
    info: 'It is a man born on Sunday, November 13, 2129',
    isValid: true,
    lang: 'en',
    month: '11',
    monthInt: 11,
    monthName: 'November',
    reason: undefined,
    serial: '0001',
    sex: 'male',
    sexName: 'man',
    value: '29511300014',
    verdict: 'the PESEL number is correct',
    year: 2129,
    yearShort: '29'
}
```

#### Invalid PESEL

```javascript
PeselProperties =  {
    icon: '⛔',
    isValid: false,
    lang: 'en',
    error: 'incorrect date (2129-11-33)',
    value: '29513300014',
    verdict: 'the PESEL number is invalid'
}
```
