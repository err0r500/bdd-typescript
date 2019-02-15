import { binding, given, then } from "cucumber-tsflow"

import {AccountRepo, AuthenticationGateway} from "../../src/domain/interfaces"
import {Config} from './config'
import {Account} from "../../src/domain/account"
import * as assert from "assert"

@binding([Config])
class AccountSteps {
    private accountRepo: AccountRepo;
    private authGateway: AuthenticationGateway;

    @given(/^le solde de mon compte est de "([^"]*)" euros TTC avec "([^"]*)" euros TTC d'avoir$/)
    private soldeDeMonCompte(solde: number, avoir: number): null | Error {
        const currentUser = this.authGateway.getCurrent()
        if (currentUser == null) {
            return new Error("user not loggedIn")
        }

        if (this.accountRepo.isEmpty()){
            const account = new Account(currentUser.id, solde, avoir)
            this.accountRepo.create(account)
            return null
        }

        const currentAccount = this.accountRepo.getAccount(currentUser)
        if (currentAccount == null) {
            return new Error("account not found")
        }

        assert.deepStrictEqual(currentAccount, new Account(currentUser.id, solde, avoir))
        return null
    }

    @then(/^et une alerte pour insuffisance de solde se lève$/)
    private unAuthenticatedAlert (): string {
        return "pending"
    }

    public constructor(config: Config){
        this.accountRepo = config.accountRepo
        this.authGateway = config.authGateway
    }
}

export = AccountSteps
