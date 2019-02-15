export class Customer {
    public id: string
    public firstName: string
    private lastName: string

    public constructor(id: string, firstName: string, lastName: string) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
    }
}

