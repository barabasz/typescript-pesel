"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pesel = void 0;
var Pesel;
(function (Pesel_1) {
    var Pesel = /** @class */ (function () {
        function Pesel(pesel, language) {
            if (language === void 0) { language = "pl"; }
            this.pesel = new PeselProperties(pesel, language);
            this.dict = new PeselDict(this.pesel.lang);
            if (this.hasProperLength()
                && this.hasNoWhitespaces()
                && this.hasOnlyDigits()
                && this.hasValidDate()
                && this.hasValidChecksum()) {
                this.pesel.isValid = true;
                this.setPeselProperties();
            }
            else {
                this.pesel.isValid = false;
                this.pesel.verdict = this.dict.invalid;
            }
        }
        Pesel.prototype.cfl = function (str) {
            if (!str)
                return str;
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        Pesel.prototype.hasProperLength = function () {
            if (this.pesel.value.length < 11) {
                this.pesel.reason = this.dict.tooShort;
                return false;
            }
            else if (this.pesel.value.length > 11) {
                this.pesel.reason = this.dict.tooLong;
                return false;
            }
            else {
                return true;
            }
        };
        Pesel.prototype.hasOnlyDigits = function () {
            var regex = /^\d+$/;
            if (!regex.test(this.pesel.value)) {
                this.pesel.reason = this.dict.notJustDigits;
                return false;
            }
            else {
                return true;
            }
        };
        Pesel.prototype.hasNoWhitespaces = function () {
            if (/\s/.test(this.pesel.value)) {
                this.pesel.reason = this.dict.redundantSpaces;
                return false;
            }
            else {
                return true;
            }
        };
        Pesel.prototype.hasValidDate = function () {
            var dateString = this.getCentury() + this.pesel.value.substring(0, 2) + "-";
            dateString += this.getMonth() + "-" + this.pesel.value.substring(4, 6);
            var dateObj = new Date(dateString);
            if (!isNaN(dateObj.getFullYear()) && dateObj.toISOString().substring(0, 10) === dateString) {
                return true;
            }
            else {
                this.pesel.reason = "".concat(this.dict.invalidDate, " (").concat(dateString, ")");
                return false;
            }
        };
        Pesel.prototype.hasValidChecksum = function () {
            if (this.calculateChecksum() !== parseInt(this.pesel.value[10], 10)) {
                this.pesel.reason = this.dict.invalidChecksum;
                return false;
            }
            else {
                return true;
            }
        };
        Pesel.prototype.getCentury = function () {
            var m = parseInt(this.pesel.value[2], 10);
            var c = ['19', '19', '20', '20', '21', '21', '22', '22', '18', '18'];
            return parseInt(c[m], 10);
        };
        Pesel.prototype.getMonth = function () {
            var m = parseInt(this.pesel.value[2], 10);
            var c = ['0', '1', '0', '1', '0', '1', '0', '1', '0', '1'];
            return c[m] + this.pesel.value[3];
        };
        Pesel.prototype.getSex = function () {
            return parseInt(this.pesel.value[9], 10) % 2 === 0 ? 'female' : 'male';
        };
        Pesel.prototype.makeLongDate = function () {
            if (this.pesel.lang == "pl") {
                var date = "".concat(this.pesel.dayInt, " ");
                date += this.dict.monthGen[this.pesel.monthInt - 1] + " ";
                date += this.pesel.year;
                return date;
            }
            else {
                return "".concat(this.pesel.monthName, " ").concat(this.pesel.dayInt, ", ").concat(this.pesel.year);
            }
        };
        Pesel.prototype.makeDowPrep = function () {
            if (this.pesel.lang == "en") {
                return "on";
            }
            else {
                return (this.pesel.dowName.substring(0, 1)) == "w" ? "we" : "w";
            }
        };
        Pesel.prototype.makeIsoDate = function () {
            return "".concat(this.pesel.year, "-").concat(this.pesel.month, "-").concat(this.pesel.day);
        };
        Pesel.prototype.makeInfo = function () {
            var i = this.dict.itIs + " ";
            i += (this.pesel.lang == 'en') ? "a " : "";
            i += this.pesel.sexName + " ";
            i += (this.pesel.sex == 'male' ? this.dict.maleBorn : this.dict.femaleBorn) + " ";
            i += this.makeDowPrep() + " ";
            i += this.dict.dowAcc[this.pesel.dow];
            i += (this.pesel.lang == 'en') ? ", " : " ";
            i += this.pesel.dateLong;
            return this.cfl(i);
        };
        Pesel.prototype.calculateChecksum = function () {
            var weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
            var sum = 0;
            for (var i = 0; i < 10; i++) {
                sum += parseInt(this.pesel.value[i], 10) * weights[i];
            }
            return (10 - (sum % 10)) % 10;
        };
        Pesel.prototype.setPeselProperties = function () {
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
        };
        Pesel.prototype.valid = function () {
            return this.pesel.isValid;
        };
        Pesel.prototype.info = function () {
            return this.pesel.verdict;
        };
        Pesel.prototype.date = function () {
            if (this.pesel.isValid) {
                return this.pesel.date;
            }
            else {
                return null;
            }
        };
        Pesel.prototype.error = function () {
            if (this.pesel.isValid) {
                return null;
            }
            else {
                return this.pesel.reason;
            }
        };
        Pesel.prototype.json = function () {
            return JSON.stringify(this.pesel, null, 2);
        };
        Pesel.prototype.print = function () {
            console.log(this.pesel);
        };
        return Pesel;
    }());
    Pesel_1.Pesel = Pesel;
    var PeselDict = /** @class */ (function () {
        function PeselDict(lang) {
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
            }
            else {
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
        return PeselDict;
    }());
    Pesel_1.PeselDict = PeselDict;
    var PeselProperties = /** @class */ (function () {
        function PeselProperties(pesel, language) {
            var lang = language.toLowerCase();
            this.value = pesel.trim();
            this.lang = (lang == 'pl' || lang == 'en') ? lang : 'en';
        }
        return PeselProperties;
    }());
    Pesel_1.PeselProperties = PeselProperties;
})(Pesel || (exports.Pesel = Pesel = {}));
