export class Song {

    id: string
    url: string;
    thumbnail: string;
    name: string
    mimeType: string
    isFavourite: boolean
    views:number;
    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.id = obj.id;
        this.url = obj.url;
        this.thumbnail = obj.thumbnail;
        this.name = obj.name;
        this.mimeType = obj.mimeType;
        this.isFavourite = obj.isFavourite;
        this.views = obj.views;

    }
}