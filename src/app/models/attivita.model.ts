export interface AttivitaInterface {
    title: string,
    done: boolean
}

export class Attivita implements AttivitaInterface {
    public id: string;
    public title: string;
    public done: boolean;
    
    constructor(title: string){
        this.id = this.uuidv4();
        this.title = title;
        this.done = false;
    }

    //
    toggleAttivita(): void{
        this.done = !this.done;
    }

    //Copiato
    uuidv4(): string {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (c: number) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
    }
}