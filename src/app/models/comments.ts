import { CommentBy } from "./commentBy";

export class Comments {

    text: string;
    date: string;
    commentBy: CommentBy;



    constructor(obj?: any) {
        if (!obj) {
            return;
        }

        this.text = obj.text;
        this.date = obj.date;
        this.commentBy = obj.commentBy;
    }
}