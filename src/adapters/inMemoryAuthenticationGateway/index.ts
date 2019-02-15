import {AuthenticationGateway} from '../../domain/interfaces'
import {Customer} from '../../domain/customer'

export class InMemoryAuthenticationGateway implements AuthenticationGateway {
    private currentCustomer: Customer | null = null

    public authenticate(customer: Customer): null {
        this.currentCustomer = customer
        return null
    }

    public getCurrent(): Customer | null {
        return this.currentCustomer
    }
}
