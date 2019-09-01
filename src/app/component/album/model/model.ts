
export class Album {
    public id: string;
    constructor(
        public title: string, 
        public artist:string, 
        public year:string,
    ){}
}
export class AlbumID {
    public a_id: string;
    constructor(
        public albumid:string
    ){}
}