export class BookingAttempt {
    private vtcFirstname: string
    private origin: string
    private destination: string

    public handle(): string{
        return "ok"
    }


    public constructor(vtcFirstname: string, origin: string, destination: string) {
        this.vtcFirstname = vtcFirstname
        this.origin = origin
        this.destination = destination
    }
}
