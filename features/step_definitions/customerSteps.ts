import {TableDefinition} from "cucumber"
import { binding, given, when, then } from "cucumber-tsflow"

import {Customer} from "../../src/domain/customer"
import {CustomerRepo, AuthenticationGateway} from "../../src/domain/interfaces"
import {expect} from "chai"
import {Config} from "./config"
import {BookingAttempt} from "../../src/usecases/bookingAttempt"

@binding([Config])
class CustomerSteps {
    private customerRepo: CustomerRepo;
    private authGateway: AuthenticationGateway;

    @given(/^des clients existent:$/)
    private clientsExistent(dataTable: TableDefinition): void | Error {
        dataTable.rows().map((r: string[]) => {
            const customer = new Customer(r[0], r[1], r[2])
            this.customerRepo.Create(customer)
            expect(this.customerRepo.All()).to.deep.include.members([customer])
        })
        return
    }

    @given(/^je suis authentifié en tant que le client "([^"]*)"$/)
    private authentifieEnTantQue(clientFirstname: string): null | Error {
        const currentCustomer = this.authGateway.GetCurrent()

        if (currentCustomer == null) {
            const customerToLogIn = this.customerRepo.GetByFirstName(clientFirstname)
            if (customerToLogIn == null){
                return new Error("no customer found with firstname")
            }
            this.authGateway.Authenticate(customerToLogIn)
            return null
        }

        if(currentCustomer.firstName !== clientFirstname) {
            return new Error("wrong user currently loggedIn")
        }

        return null
    }

    @when(/^je tente de réserver le VTC "([^"]*)" de "([^"]*)" à "([^"]*)"$/)
    private bookingAttempt (vtcFirstname: string, origin: string, destination: string): null | Error {
        new BookingAttempt(vtcFirstname, origin, destination).Handle()
        return null
    }

    @then(/^la réservation est effective$/)
    private bookingSuceeded (): null | Error {
        return null
    }

    public constructor(config: Config){
        this.customerRepo = config.customerRepo
        this.authGateway = config.authGateway
    }
}

export = CustomerSteps
