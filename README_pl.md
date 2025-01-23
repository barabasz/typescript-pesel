# PESEL

Bardzo prosta klasa w TypeScript do określania poprawności numeru [PESEL](https://pl.wikipedia.org/wiki/PESEL) — Powszechnego Elektronicznego Systemu Ewidencji Ludności używanego w Polsce od 1979. Ta klasa nie ma żadnych zależności zewnętrznych.

Numer PESEL obsługuje daty urodzin od `1800-01-01` do `2299-12-31` (`YYYY-MM-DD`), zawiera numer seryjny, informację o płci urodzonej osoby oraz sumę kontrolną.

🇬🇧 See [English readme file](README.md).

## Użycie

```typescript
import {Pesel} from './Pesel.ts';
let language = 'pl';      // obsługiwane języki: 'pl' (polski) i 'en' (angielski)

// poprawny PESEL
let pesel = '29511300014';
const p1 = new Pesel.Check(pesel, language);

console.log(p1.valid());   // true
console.log(p1.verdict()); // 'numer PESEL jest poprawny ✅'
console.log(p1.info());    // 'To jest mężczyzna urodzony w niedzielę 13 listopada 2129 r.'
console.log(p1.date());    // '2129-11-13'
console.log(p1.error());   // null

// niepoprawny PESEL
pesel = '29513300014';
const p2 = new Pesel.Check(pesel, language);

console.log(p2.valid());   // true
console.log(p2.verdict()); // 'numer PESEL nie jest poprawny ⛔'
console.log(p2.info());    // null
console.log(p2.date());    // null
console.log(p2.error());   // 'niepoprawna data (2129-11-33)'
```

Można również: 

```typescript
console.log(p1.json());    // {string w formacie JSON ze wszystkimi właściwościami}
p1.print();                // drukuje wszystkie właściwości do konsoli
```

## Metody

Klasa [Pesel](./bin/Pesel.ts) posiada następujące publiczne metody:

- `date()` - _string_: data z numeru PESEL w formacie 'YYYY-MM-DD' lub _null_, jeśli PESEL nieprawidłowy,
- `error()` - _string_: wyjaśnienie niepoprawności numeru lub _null_, jeśli PESEL prawidłowy,
- `verdict()` - _string_: czytelna informacja, czy PESEL jest poprawny,
- `info()` - _string_: informacja o osobie posiadającej taki PESEL,
- `json()` - _string_: JSON ze wszystkimi właściwościami lub _null_, jeśli PESEL nieprawidłowy,
- `print()` - _void_: drukuje wszystkie właściwości do konsoli,
- `valid()` - _boolean_: czy PESEL jest poprawny.

## Właściwości

Klasa [PeselProperties](./bin/Pesel.ts) ma następujące właściwości:

### Właściwości zawsze obecne

- `icon` - _string_: ✅ lub ⛔,
- `isValid` - _boolean_: czy PESEL jest prawidłowy,
- `lang` - _string_: dwuliterowy kod języka,
- `value` - _string_: przycięty wprowadzony numer,
- `verdict` - _string_: informacja, czy PESEL jest prawidłowy.

### Właściwości dodatkowo obecne przy błędnym numerze

- `error` - _string_: przyczyna błędu

### Właściwości dodatkowo obecne przy poprawnym numerze

- `century` - _integer_: jedna lub dwie ostatnie cyfry z roku,
- `checksum` - _integer_: suma kontrolna (ostatnia cyfra),
- `dateLong` - _string_: urodziny w długim formacie,
- `dateObj` - obiekt klasy `Date` z datą urodzin,
- `date` - _string_: urodziny w formacie `YYYY-MM-DD`,
- `dayInt` - _integer_: dzień z daty urodzin,
- `day` - _string_: dwuznakowy dzień z daty urodzin,
- `dowName` - _string_: dzień tygodnia z daty urodzin,
- `dow` - _integer_: dzień tygodnia z daty urodzin (`0` = niedziela),
- `icon` - _string_: ✅ lub ⛔w zależności od poprawności PESEL-u,
- `info` - _string_: szczegółowa informacja o osobie z takim numerem PESEL,
- `monthInt` - _integer_: miesiąc z daty urodzin,
- `monthName` - _string_: miesiąc z daty urodzin,
- `month` - _string_: miesiąc z daty urodzin,
- `serial` - _string_: numer seryjny (z informacją o płci),
- `sexName` - _string_: płeć,
- `sex` - _string_: płeć (`male`/`female`),
- `yearShort` - _string_: dwie ostatnie cyfry z roku,
- `year` - _integer_: rok z daty urodzin.

### Właściwości wydrukowane do konsoli

#### Poprawny PESEL

```javascript
PeselProperties = {
    icon: '✅',
    value: '29511300014',
    lang: 'pl',
    isValid: true,
    verdict: 'numer PESEL jest poprawny',
    yearShort: '29',
    century: 21,
    year: 2129,
    month: '11',
    monthInt: 11,
    monthName: 'listopad',
    day: '13',
    dayInt: 13,
    date: '2129-11-13',
    dateLong: '13 listopada 2129',
    dateObj: '2129-11-13T00:00:00.000Z',
    dow: 0,
    dowName: 'niedziela',
    serial: '0001',
    sex: 'male',
    sexName: 'mężczyzna',
    checksum: 4,
    info: 'To jest mężczyzna urodzony w niedzielę 13 listopada 2129 r.'
}
```

#### Niepoprawny PESEL

```javascript
PeselProperties =  {
    icon: '⛔',
    isValid: false,
    lang: 'pl',
    error: '"niepoprawna data (2129-11-33)',
    value: '29513300014',
    verdict: '"numer PESEL nie jest poprawny'
}
```
