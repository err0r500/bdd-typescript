import {Vtc} from './vtc'
import {Customer} from "./customer"
import {Account} from "./account"

export interface CustomerRepo {
    create(customer: Customer): null;
    getByFirstName(firstName: string): Customer | null;
    all(): Customer[];
}

export interface VtcRepo {
    create(vtc: Vtc): null;
    all(): Vtc[];
}

export interface AuthenticationGateway {
    authenticate(customer: Customer): null;
    getCurrent(): Customer | null;
}

export interface AccountRepo {
    create(account: Account): null;
    getAccount(customer: Customer): null | Account;
    isEmpty(): boolean;
}
