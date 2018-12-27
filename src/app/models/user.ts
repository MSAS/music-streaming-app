import { RoleModel } from "./roleModel";
import { Profile } from "./profile";
import { Address } from "./address";
export class User {

    name: string;
    city: string;
    phone: string;
    email: string;
    id: string;
    otp: string;
    key: string;
    roles: Array<RoleModel>;
    password: string;
    code: string;
    profile: Profile
    address: Address;





    //Handle these in a commaon class
    isSuccess: boolean;
    error: string;
    message: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.code = obj.code;
        this.phone = obj.phone;
        this.email = obj.email;
        this.roles = obj.roles;
        this.address = obj.address;

        // this.profile = obj.profile;
    }
}