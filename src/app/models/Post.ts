export class Post {
    public id?: number;
    public name: string;
    public email: string;
    public message: string;

    constructor(name: string = '', email: string = '', message: string = '', id?: number) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.id = id;
    }
}
