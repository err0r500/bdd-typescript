import {AuthenticationGateway} from '../../domain/interfaces'
import {Customer} from '../../domain/customer'

export class InMemoryAuthenticationGateway implements AuthenticationGateway {
    private currentCustomer: Customer | null = null

    public Authenticate(customer: Customer): null {
        this.currentCustomer = customer
        return null
    }

    public GetCurrent(): Customer | null {
        return this.currentCustomer
    }
}
