import { Profile } from "./profile";
import { RoleModel } from "./roleModel";

export class CommentBy {

    id: string;
    email: string;
    phone: string;
    profile: Profile;
    role: RoleModel;



    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.email = obj.email;
        this.phone = obj.phone;
        this.profile = obj.profile;
        this.role = obj.role;

    }
}