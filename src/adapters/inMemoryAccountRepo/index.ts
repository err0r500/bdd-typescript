import {AccountRepo} from '../../domain/interfaces'
import {Account} from "../../domain/account"
import {Customer} from "../../domain/customer"

export class InMemoryAccountRepo implements AccountRepo {
    private repo: Account[];

    public create(account: Account): null {
        this.repo.push(account)
        return null
    }

    public getAccount(customer: Customer): null | Account {
        const account = this.repo.filter(account => account.id === customer.id)[0]
        if (account == null) {
            return null
        }
        return account
    }

    public isEmpty(): boolean {
        return this.repo.length === 0
    }

    public constructor(){
        this.repo = []
    }
}
