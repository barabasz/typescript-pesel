import {Pesel} from './Pesel.ts';

let pesel = '29511300014';
const p = new Pesel(pesel, 'plk');

p.isValid();
p.info();
p.returnJson();
p.printData();
