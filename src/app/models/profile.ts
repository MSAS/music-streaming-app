import { Pic } from "./pic";

export class Profile {

    firstName: string;
    lastName: string;
    gender: string;
    pic: Pic;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.gender = obj.gender;
        this.pic = obj.pic;
        // this.profile = obj.profile;
    }
}