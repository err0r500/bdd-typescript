import { binding, given } from "cucumber-tsflow"

import {AccountRepo, AuthenticationGateway, VtcRepo} from "../../src/domain/interfaces"
import {Config} from './config'
import {Account} from "../../src/domain/account"
import {expect} from "chai"

@binding([Config])
class AccountSteps {
    private accountRepo: AccountRepo;
    private authGateway: AuthenticationGateway;

    @given(/^le solde de mon compte est de "([^"]*)" euros TTC avec "([^"]*)" euros TTC d'avoir$/)
    private soldeDeMonCompte(solde: number, avoir: number): null | Error {
        const currentUser = this.authGateway.GetCurrent()
        if (currentUser == null) {
            return new Error("user not loggedIn")
        }

        if (this.accountRepo.IsEmpty()){
            const account = new Account(currentUser.id, solde, avoir)
            this.accountRepo.Create(account)
            return null
        }

        const currentAccount = this.accountRepo.GetAccount(currentUser)
        if (currentAccount == null) {
            return new Error("account not found")
        }

        expect(currentAccount).to.deep.equals(new Account(currentUser.id, solde, avoir))
        return null
    }

    public constructor(config: Config){
        this.accountRepo = config.accountRepo
        this.authGateway = config.authGateway
    }
}

export = AccountSteps
