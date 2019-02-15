interface Blabla {
    bla(): number;
}

class Bclass implements Blabla {
    private readonly bb: number;

    public constructor(bb: number) {
        this.bb = bb
    }

    public bla(): number {
        return this.bb
    }
}

console.log(new Bclass(123).bla())

