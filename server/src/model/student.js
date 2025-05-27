export class Student {
    constructor(id, name, password) {
        this._id = id;
        this.name = name;
        this.password = password;
        this.scores = {};
    }
}