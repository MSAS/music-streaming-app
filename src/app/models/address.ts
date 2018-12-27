export class Address {

    line1: string;
    line2: string;
    pinCode: string;
    city: string;
    state: string;
    country: string;



    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.line1 = obj.line1;
        this.line2 = obj.line2;
        this.pinCode = obj.pinCode;
        this.city = obj.city;
        this.state = obj.state;
        this.country = obj.country;

        // this.profile = obj.profile;
    }
}