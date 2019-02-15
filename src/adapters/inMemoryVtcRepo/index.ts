import {VtcRepo} from '../../domain/interfaces'
import {Vtc} from '../../domain/vtc'

export class InMemoryVtcRepo implements VtcRepo {
    private repo: Vtc[];

    public create(vtc: Vtc): null {
        this.repo.push(vtc)
        return null
    }

    public constructor(){
        this.repo = []
    }

    public all(): Vtc[] {
        return this.repo
    }
}
