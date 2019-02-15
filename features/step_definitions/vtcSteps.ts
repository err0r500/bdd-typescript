import {TableDefinition} from "cucumber"
import { binding, given } from "cucumber-tsflow"

import {Vtc} from "../../src/domain/vtc"
import {VtcRepo} from "../../src/domain/interfaces"
import * as assert from "assert"
import {Config} from "./config"

@binding([Config])
class VtcSteps {
    private vtcRepo: VtcRepo;

    @given(/^des VTC existent:$/)
    private clients(dataTable: TableDefinition): string | void | Error {
        dataTable.rows().map((r: string[]) => {
            const vtc = new Vtc(r[0], r[1], r[2])
            this.vtcRepo.create(vtc)
            assert.notStrictEqual(this.vtcRepo.all().indexOf(vtc), -1)
        })
        return
    }

    public constructor(config: Config){
        this.vtcRepo = config.vtcRepo
    }
}

export = VtcSteps
