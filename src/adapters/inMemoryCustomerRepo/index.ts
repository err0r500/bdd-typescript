import {CustomerRepo} from '../../domain/interfaces'
import {Customer} from '../../domain/customer'

export class InMemoryCustomerRepo implements CustomerRepo {
    private repo: Customer[];

    public create(customer: Customer): null {
        this.repo.push(customer)
        return null
    }

    public getByFirstName(firstName: string): Customer | null {
        const resp = this.repo.filter(customer => customer.firstName === firstName)[0]
        if (typeof resp === 'undefined') {
            return null
        }
        return resp
    }

    public all(): Customer[] {
        return this.repo
    }

    public constructor(){
        this.repo = []
    }
}
