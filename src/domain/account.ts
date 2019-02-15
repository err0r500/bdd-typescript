export class Account {
    public constructor(id: string, solde: number, avoir: number) {
        this.id = id
        this.solde = solde
        this.avoir = avoir
    }

    public id: string
    private solde: number
    private avoir: number
}
