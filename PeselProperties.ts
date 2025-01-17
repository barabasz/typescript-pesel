export class PeselProperties {

    value: string;
    lang: string;
    isValid!: boolean;
    verdict!: string;
    century!: number;
    yearShort!: string;
    year!: number;
    month!: string;
    monthInt!: number;
    monthName!: string;
    day!: string;
    dayInt!: number;
    date!: string;
    dateObj!: Date;
    dow!: number;
    dowName!: string;
    dowPrep!: string;
    dateLong!: string;
    serial!: string;
    sex!: string;
    sexName!: string;
    verb!: string;
    checksum!: number;
    info!: string;
    reason!: string;

    constructor(pesel: string, language: string) {
        const lang: string = language.toLowerCase();
        this.value = pesel.trim();
        this.lang = (lang == 'pl' || lang == 'en') ? lang : 'en';
    }
}
