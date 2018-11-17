import { RoleModel } from "./roleModel";
export class User {
    name: string;
    city: string;
    phone: string;
    email:string;
    id: string;
    otp: string;
    key: string;
    roles: Array<RoleModel>;
}