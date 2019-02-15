import {VtcRepo} from '../../domain/interfaces'
import {Vtc} from '../../domain/vtc'

export class InMemoryVtcRepo implements VtcRepo {
    private repo: Vtc[];

    public Create(vtc: Vtc): null {
        this.repo.push(vtc)
        return null
    }

    public constructor(){
        this.repo = []
    }

    public All(): Vtc[] {
        return this.repo
    }
}
