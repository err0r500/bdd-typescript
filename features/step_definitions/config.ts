import {AccountRepo, AuthenticationGateway, CustomerRepo, VtcRepo} from "../../src/domain/interfaces"
import {InMemoryCustomerRepo} from "../../src/adapters/inMemoryCustomerRepo"
import {InMemoryAuthenticationGateway} from "../../src/adapters/inMemoryAuthenticationGateway"
import {InMemoryVtcRepo} from "../../src/adapters/inMemoryVtcRepo"
import {InMemoryAccountRepo} from "../../src/adapters/inMemoryAccountRepo"

export class Config {
    public accountRepo: AccountRepo;
    public customerRepo: CustomerRepo;
    public authGateway: AuthenticationGateway;
    public vtcRepo: VtcRepo;

    public constructor() {
        this.accountRepo = new InMemoryAccountRepo()
        this.customerRepo = new InMemoryCustomerRepo()
        this.authGateway = new InMemoryAuthenticationGateway()
        this.vtcRepo = new InMemoryVtcRepo()
    }
}
