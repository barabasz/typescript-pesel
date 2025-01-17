export class PeselDict {

    month: string[];
    monthGen: string[];
    dow: string[];
    dowAcc: string[];
    valid: string;
    invalid: string;
    tooShort: string;
    tooLong: string;
    redundantSpaces: string;
    notJustDigits: string;
    invalidChecksum: string;
    invalidDate: string;
    itIs: string;
    male: string;
    maleBorn: string;
    female: string;
    femaleBorn: string;

    constructor(lang: string) {
        if (lang == "pl") {
            this.month = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
            this.monthGen = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
            this.dow = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
            this.dowAcc = ['niedzielę', 'poniedziałek', 'wtorek', 'środę', 'czwartek', 'piątek', 'sobotę'];
            this.valid = "numer PESEL jest poprawny";
            this.invalid = "numer PESEL nie jest poprawny";
            this.tooShort = "numer jest za krótki";
            this.tooLong = "numer jest za długi";
            this.redundantSpaces = "numer nie może zawierać spacji";
            this.notJustDigits = "numer musi się składać z samych cyfr";
            this.invalidChecksum = "niepoprawna suma kontrolna (ostatnia cyfra)";
            this.invalidDate = "niepoprawna data";
            this.itIs = "to jest";
            this.male = "mężczyzna";
            this.maleBorn = "urodzony";
            this.female = "kobieta";
            this.femaleBorn = "urodzona";
        } else {
            this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            this.monthGen = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            this.dow = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            this.dowAcc = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            this.valid = "the PESEL number is correct";
            this.invalid = "the PESEL number is incorrect";
            this.tooShort = "the number is too short";
            this.tooLong = "the number is too long";
            this.redundantSpaces = "number cannot contain spaces";
            this.notJustDigits = "the number must consist of only digits";
            this.invalidChecksum = "invalid checksum (last digit)";
            this.invalidDate = "incorrect date";
            this.itIs = "it is";
            this.male = "man";
            this.maleBorn = "born";
            this.female = "woman";
            this.femaleBorn = "born";
        }
    }

}
