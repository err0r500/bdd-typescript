import {TableDefinition} from "cucumber"
import { binding, given } from "cucumber-tsflow"

import {Vtc} from "../../src/domain/vtc"
import {VtcRepo} from "../../src/domain/interfaces"
import {expect} from "chai"
import {Config} from "./config"

@binding([Config])
class VtcSteps {
    private vtcRepo: VtcRepo;

    @given(/^des VTC existent:$/)
    private clients(dataTable: TableDefinition): string | void | Error {
        dataTable.rows().map((r: string[]) => {
            const vtc = new Vtc(r[0], r[1], r[2])
            this.vtcRepo.Create(vtc)
            expect(this.vtcRepo.All()).to.deep.include.members([vtc])
        })
        return
    }

    public constructor(config: Config){
        this.vtcRepo = config.vtcRepo
    }
}

export = VtcSteps
