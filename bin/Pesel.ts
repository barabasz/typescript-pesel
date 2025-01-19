export namespace Pesel {

    export class Check {

        private readonly pesel: PeselProperties;
        private readonly dict: PeselDict;

        constructor(pesel: string, language: string = "pl") {
            this.pesel = new PeselProperties(pesel, language);
            this.dict = new PeselDict(this.pesel.lang);
            this.pesel.isValid // main validation
                 = this.hasProperLength()
                && this.hasNoWhitespaces()
                && this.hasOnlyDigits()
                && this.hasValidDate()
                && this.hasValidChecksum();
            this.setPeselProperties();
        }

        public cfl(str: string): string {
            if (!str) return str;
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        private hasProperLength(): boolean {
            if (this.pesel.value.length < 11) {
                this.pesel.error = this.dict.tooShort;
                return false;
            } else if (this.pesel.value.length > 11) {
                this.pesel.error = this.dict.tooLong;
                return false;
            } else {
                return true;
            }
        }

        private hasOnlyDigits(): boolean {
            const regex = /^\d+$/;
            if (!regex.test(this.pesel.value)) {
                this.pesel.error = this.dict.notJustDigits;
                return false;
            } else {
                return true;
            }
        }

        private hasNoWhitespaces(): boolean {
            if (/\s/.test(this.pesel.value)) {
                this.pesel.error = this.dict.redundantSpaces;
                return false;
            } else {
                return true;
            }
        }

        private hasValidDate(): boolean {
            let dateString = this.getCentury() + this.pesel.value.substring(0, 2) + "-";
            dateString += this.getMonth() + "-" + this.pesel.value.substring(4, 6);
            const dateObj = new Date(dateString);
            if (!isNaN(dateObj.getFullYear()) && dateObj.toISOString().substring(0, 10) === dateString) {
                return true;
            } else {
                this.pesel.error = `${this.dict.invalidDate} (${dateString})`;
                return false;
            }
        }

        private hasValidChecksum(): boolean {
            if (this.calculateChecksum() !== parseInt(this.pesel.value[10], 10)) {
                this.pesel.error = this.dict.invalidChecksum;
                return false;
            } else {
                return true;
            }
        }

        private getCentury(): number {
            let m = parseInt(this.pesel.value[2], 10);
            let c = ['19', '19', '20', '20', '21', '21', '22', '22', '18', '18'];
            return parseInt(c[m], 10);
        }

        private getMonth(): string {
            let m = parseInt(this.pesel.value[2], 10);
            let c = ['0', '1', '0', '1', '0', '1', '0', '1', '0', '1'];
            return c[m] + this.pesel.value[3];
        }

        private getSex(): string {
            return parseInt(this.pesel.value[9], 10) % 2 === 0 ? 'female' : 'male'
        }

        private makeLongDate(): string {
            if (this.pesel.lang == "pl") {
                let date = `${this.pesel.dayInt} `;
                date += this.dict.monthGen[this.pesel.monthInt - 1] + " ";
                date += this.pesel.year;
                return date;
            } else {
                return `${this.pesel.monthName} ${this.pesel.dayInt}, ${this.pesel.year}`
            }
        }

        private makeDowPrep(): string {
            if (this.pesel.lang == "en") {
                return "on"
            } else {
                return (this.pesel.dowName.substring(0, 1)) == "w" ? "we" : "w"
            }
        }

        private makeIsoDate(): string {
            return `${this.pesel.year}-${this.pesel.month}-${this.pesel.day}`
        }

        private makeInfo(): string {
            let i = this.dict.itIs + " ";
            i += (this.pesel.lang == 'en') ? "a " : "";
            i += this.pesel.sexName + " ";
            i += (this.pesel.sex == 'male' ? this.dict.maleBorn : this.dict.femaleBorn) + " ";
            i += this.makeDowPrep() + " ";
            i += this.dict.dowAcc[this.pesel.dow];
            i += (this.pesel.lang == 'en') ? ", " : " ";
            i += this.pesel.dateLong;
            i += (this.pesel.lang == 'en') ? "." : " r.";
            return this.cfl(i);
        }

        private calculateChecksum(): number {
            const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            let sum = 0;
            for (let i = 0; i < 10; i++) {
                sum += parseInt(this.pesel.value[i], 10) * weights[i];
            }
            return (10 - (sum % 10)) % 10;
        }

        private setPeselProperties(): void {
            if (this.pesel.isValid) {
                this.pesel.icon = "✅";
                this.pesel.verdict = this.dict.valid;
                this.pesel.yearShort = this.pesel.value.substring(0, 2);
                this.pesel.century = this.getCentury();
                this.pesel.year = parseInt(this.pesel.century.toString() + this.pesel.yearShort, 10);
                this.pesel.month = this.getMonth();
                this.pesel.monthInt = parseInt(this.pesel.month, 10);
                this.pesel.monthName = this.dict.month[parseInt(this.pesel.month, 10) - 1];
                this.pesel.day = this.pesel.value.substring(4, 6);
                this.pesel.dayInt = parseInt(this.pesel.day, 10);
                this.pesel.date = this.makeIsoDate();
                this.pesel.dateLong = this.makeLongDate();
                this.pesel.dateObj = new Date(this.pesel.date);
                this.pesel.dow = this.pesel.dateObj.getDay();
                this.pesel.dowName = this.dict.dow[this.pesel.dow];
                this.pesel.serial = this.pesel.value.substring(6, 10);
                this.pesel.sex = this.getSex();
                this.pesel.sexName = (this.pesel.sex == 'male' ? this.dict.male : this.dict.female);
                this.pesel.checksum = parseInt(this.pesel.value[10], 10);
                this.pesel.info = this.makeInfo();
            } else {
                this.pesel.icon = "⛔";
                this.pesel.verdict = this.dict.invalid;
            }
        }

        public valid(): boolean {
            return this.pesel.isValid;
        }

        public verdict(): string {
            return this.pesel.verdict;
        }

        public info(): string {
            if (this.pesel.isValid) {
                return this.pesel.info;
            } else {
                return null;
            }
        }

        public date(): string | null {
            if (this.pesel.isValid) {
                return this.pesel.date;
            } else {
                return null;
            }
        }

        public error(): string | null {
            if (this.pesel.isValid) {
                return null;
            } else {
                return this.pesel.error;
            }
        }

        public json(): string {
            return JSON.stringify(this.pesel, null, 2);
        }

        public print(): void {
            console.log(this.json());
        }

    }
    
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

    export class PeselProperties {

        century!: number;
        checksum!: number;
        date!: string;
        dateLong!: string;
        dateObj!: Date;
        day!: string;
        dayInt!: number;
        dow!: number;
        dowName!: string;
        icon!: string;
        info!: string;
        isValid!: boolean;
        lang: string;
        month!: string;
        monthInt!: number;
        monthName!: string;
        error!: string;
        serial!: string;
        sex!: string;
        sexName!: string;
        value: string;
        verdict!: string;
        year!: number;
        yearShort!: string;

        constructor(pesel: string, language: string) {
            const lang: string = language.toLowerCase();
            this.value = pesel.trim();
            this.lang = (lang == 'pl' || lang == 'en') ? lang : 'en';
        }
    }
    
}
