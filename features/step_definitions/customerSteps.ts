import {TableDefinition} from "cucumber"
import { binding, given, when, then } from "cucumber-tsflow"
import * as assert from 'assert'

import {Customer} from "../../src/domain/customer"
import {CustomerRepo, AuthenticationGateway} from "../../src/domain/interfaces"
import {Config} from "./config"
import {BookingAttempt} from "../../src/usecases/bookingAttempt"

@binding([Config])
class CustomerSteps {
    private customerRepo: CustomerRepo;
    private authGateway: AuthenticationGateway;
    private bookingRef: string = ""

    @given(/^des clients existent:$/)
    private clientsExistent(dataTable: TableDefinition): void | Error {
        dataTable.rows().map((r: string[]) => {
            const customer = new Customer(r[0], r[1], r[2])
            this.customerRepo.create(customer)
            assert.notStrictEqual(this.customerRepo.all().indexOf(customer), -1)
        })
        return
    }

    @given(/^je suis authentifié en tant que le client "([^"]*)"$/)
    private authentifieEnTantQue(firstName: string): null | Error {
        const currentCustomer = this.authGateway.getCurrent()

        if (currentCustomer == null) {
            const customerToLogIn = this.customerRepo.getByFirstName(firstName)
            if (customerToLogIn == null){
                return new Error("no customer found with firstname")
            }
            this.authGateway.authenticate(customerToLogIn)
            return null
        }

        if(currentCustomer.firstName !== firstName) {
            return new Error("wrong user currently loggedIn")
        }

        return null
    }

    @given(/^je ne suis pas authentifié$/)
    private notAuthenticated (): string {
        return "pending"
    }

    @then(/^et une alerte pour identification du client impossible se lève$/)
    private unAuthenticatedAlert (): string {
        return "pending"
    }

    @when(/^je tente de réserver le VTC "([^"]*)" de "([^"]*)" à "([^"]*)"$/)
    private bookingAttempt (vtcFirstname: string, origin: string, destination: string): null | Error {
        this.bookingRef = new BookingAttempt(vtcFirstname, origin, destination).handle()
        return null
    }

    @then(/^la réservation est effective$/)
    private bookingSuceeded (): null | Error {
        assert.strictEqual(this.bookingRef, "ok")
        return null
    }

    @then(/^la réservation n'est pas effective$/)
    private bookingFailed (): null | Error {
        assert.strictEqual(this.bookingRef, "")
        return null
    }

    public constructor(config: Config){
        this.customerRepo = config.customerRepo
        this.authGateway = config.authGateway
    }
}

export = CustomerSteps
