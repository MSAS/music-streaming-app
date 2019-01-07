export class Folder {

    name: string;
    id: string;

    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.name = obj.name;
        this.id = obj.id;

    }
}