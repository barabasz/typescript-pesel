import {PeselDict} from "./PeselDict.ts";
import {PeselProperties} from "./PeselProperties.ts";

export class Pesel {

    private readonly pesel: PeselProperties;
    private readonly dict: PeselDict;

    constructor(pesel: string, language: string = "pl") {
        this.pesel = new PeselProperties(pesel, language);
        this.dict = new PeselDict(this.pesel.lang);
        if (this.hasProperLength()
            && this.hasNoWhitespaces()
            && this.hasOnlyDigits()
            && this.hasValidDate()
            && this.hasValidChecksum()
        ) {
            this.pesel.isValid = true;
            this.setPeselProperties();
        } else {
            this.pesel.isValid = false;
            this.pesel.verdict = this.dict.invalid;
        }
    }

    cfl(str: string): string {
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private hasProperLength(): boolean {
        if (this.pesel.value.length < 11) {
            this.pesel.reason = this.dict.tooShort;
            return false;
        } else if (this.pesel.value.length > 11) {
            this.pesel.reason = this.dict.tooLong;
            return false;
        } else {
            return true;
        }
    }

    private hasOnlyDigits(): boolean {
        const regex = /^\d+$/;
        if (!regex.test(this.pesel.value)) {
            this.pesel.reason = this.dict.notJustDigits;
            return false;
        } else {
            return true;
        }
    }

    private hasNoWhitespaces(): boolean {
        if (/\s/.test(this.pesel.value)) {
            this.pesel.reason = this.dict.redundantSpaces;
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
            this.pesel.reason = `${this.dict.invalidDate} (${dateString})`;
            return false;
        }
    }

    private hasValidChecksum(): boolean {
        if (this.calculateChecksum() !== parseInt(this.pesel.value[10], 10)) {
            this.pesel.reason = this.dict.invalidChecksum;
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
        i += this.pesel.verb + " ";
        i += this.pesel.dowPrep + " ";
        i += this.dict.dowAcc[this.pesel.dow];
        i += (this.pesel.lang == 'en') ? ", " : " ";
        i += this.pesel.dateLong;
        //i += (this.pesel.lang == "pl") ? " r." : ".";
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
        this.pesel.dowPrep = this.makeDowPrep();
        this.pesel.serial = this.pesel.value.substring(6, 10);
        this.pesel.sex = this.getSex();
        this.pesel.sexName = (this.pesel.sex == 'male' ? this.dict.male : this.dict.female);
        this.pesel.verb = (this.pesel.sex == 'male' ? this.dict.maleBorn : this.dict.femaleBorn);
        this.pesel.checksum = parseInt(this.pesel.value[10], 10);
        this.pesel.info = this.makeInfo();
    }

    public isValid(): boolean {
        return this.pesel.isValid;
    }

    public info(): string {
        if (this.pesel.isValid) {
            return this.cfl(this.dict.valid) + ". " + this.cfl(this.pesel.info) + ".";
        } else {
            return this.cfl(this.dict.invalid) + ". " + this.cfl(this.pesel.reason) + ".";
        }
    }

    public returnJson(): string {
        return JSON.stringify(this.pesel, null, 2);
    }

    public printData(): void {
        console.log(this.pesel);
    }

}
