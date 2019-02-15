import {Vtc} from './vtc'
import {Customer} from "./customer"
import {Account} from "./account"

export interface CustomerRepo {
    Create(customer: Customer): null;
    GetByFirstName(firstName: string): Customer | null;
    All(): Customer[];
}

export interface VtcRepo {
    Create(vtc: Vtc): null;
    All(): Vtc[];
}

export interface AuthenticationGateway {
    Authenticate(customer: Customer): null;
    GetCurrent(): Customer | null;
}

export interface AccountRepo {
    Create(account: Account): null;
    GetAccount(customer: Customer): null | Account;
    IsEmpty(): boolean;
}
