export class Reader {
    _id: string = '';
    firstName: string = '';
    lastName: string = '';
    status: Number = 0;

    constructor(initializer? :any) {
        if (!initializer) return;
        if (initializer._id) this._id = initializer._id;
        if (initializer.firstName) this.firstName = initializer.firstName;
        if (initializer.lastName) this.lastName = initializer.lastName;
        if (initializer.status) this.status = initializer.status;
    }
}