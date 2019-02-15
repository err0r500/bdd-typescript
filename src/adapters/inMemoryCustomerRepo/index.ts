import {CustomerRepo} from '../../domain/interfaces'
import {Customer} from '../../domain/customer'

export class InMemoryCustomerRepo implements CustomerRepo {
    private repo: Customer[];

    public Create(customer: Customer): null {
        this.repo.push(customer)
        return null
    }

    public GetByFirstName(firstName: string): Customer | null {
        const resp = this.repo.filter(customer => customer.firstName === firstName)[0]
        if (typeof resp === 'undefined') {
            return null
        }
        return resp
    }

    public All(): Customer[] {
        return this.repo
    }

    public constructor(){
        this.repo = []
    }
}
