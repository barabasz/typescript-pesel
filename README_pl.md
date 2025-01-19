# PESEL

Bardzo prosta klasa w TypeScript do określania poprawności numeru [PESEL](https://pl.wikipedia.org/wiki/PESEL) - Powszechnego Elektronicznego Systemu Ewidencji Ludności używanego w Polsce od 1979. Ta klasa nie ma żadnych zależności zewnętrznych.

Numer PESEL obsługuje daty urodzin od `1800-01-01` do `2299-12-31` (`YYYY-MM-DD`), zawiera numer seryjny, informację o płci urodzonej osoby oraz sumę kontrolną.

🇬🇧 See [English readme file](README.md).

## Użycie

```typescript
import {Pesel} from './Pesel.ts';
let language = 'en';

// poprawny PESEL
let pesel = '29511300014';
const p1 = new Pesel.Pesel(pesel, language);

console.log(p1.valid()); // true
console.log(p1.info());  // 'numer PESEL jest poprawny'
console.log(p1.date());  // '2129-11-13'
console.log(p1.error()); // null
console.log(p1.json());  // {string w formacie JSON ze wszystkimi właściwościami}
p1.print();              // drukuje wszystkie właściwości do konsoli


// niepoprawny PESEL
pesel = '29513300014';
const p2 = new Pesel.Pesel(pesel, language);

console.log(p2.valid()); // true
console.log(p2.info());  // 'numer PESEL nie jest poprawny'
console.log(p2.date());  // 'niepoprawna data (2129-11-33)'
console.log(p2.error()); // null
```

## Metody

Klasa [Pesel](./bin/Pesel.ts) podiada nastepujące publiczne metody:

- `valid()` - _boolean_: czy PESEL jest poprawny,
- `info()` - _string_: czytelna informacja, czy PESEL jest poprawny,
- `date()` - _string_: data z numeru PESEL w formacie 'YYYY-MM-DD' lub _null_ jeśli PESEL nieprawidłowy,
- `error()` - _string_: wyjaśnienie niepoprawności numeru lub _null_ jeśli PESEL prawidłowy,
- `json()` - _string_: JSON ze wszystkimi właściwościami lub _null_ jeśli PESEL nieprawidłowy,
- `print()` - _void_: drukuje wszystkie właściwości do konsoli.

## Właściwości

Klasa [PeselProperties](./bin/Pesel.ts) podiada nastepujące właściwości:

### Właściwości zawsze obecne

- `value` - _string_: przycięty wprowadzony numer,
- `lang` - _string_: dwuliterowy kod języka,
- `isValid` - _boolean_: czy PESEL jest prawidłowy,
- `verdict` - _string_: informacja, czy pesej jest prawidłowy.

### Właściowści obecne przy poprawnym numerze

- `yearShort` - _string_: dwie ostatnie cyfry z roku,
- `century` - _integer_: jedna lub dwie ostatnie cyfry z roku,
- `year` - _integer_: rok z daty urodzin,
- `month` - _string_: miesiąc z daty urodzin,
- `monthInt` - _integer_: miesiąc z daty urodzin,
- `monthName` - _string_: miesiąc z daty urodzin,
- `day` - _string_: dwuznakowy dzień z daty urodzin,
- `dayInt` - _integer_: dzień z daty urodzin,
- `date` - _string_: urodziny w formacie `YYYY-MM-DD`,
- `dateLong` - _string_: urodziny w długim formacie,
- `dateObj` - obiekt klasy `Date` z datą urodzin,
- `dow` - _integer_: dzień tygodnia z daty urodzin (`0` = niedziela),
- `dowName` - _string_: dzień tygodnia z daty urodzin,
- `serial` - _string_: numer seryjny (z informacją o płci),
- `sex` - _string_: płeć (`male`/`female`),
- `sexName` - _string_: płeć,
- `checksum` - _integer_: suma kontrolna (ostatnia cyfra),
- `info` - _string_: szczegółowa informacja o osobie z takim numerem PESEL.

### Właściwości wydrukowane do konsoli

#### Poprawny PESEL

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

#### Niepoprawny PESEL

```javascript
PeselProperties {
    value: '29513300014',
        lang: 'en',
        reason: 'incorrect date (2129-11-33)',
        isValid: false,
        verdict: 'the PESEL number is invalid'
}
```
