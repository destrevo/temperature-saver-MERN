
export interface Iuser {
    email: string;
    password: string;
}

export interface Idate {
    year: number;
    month: number;
    day: number;
}
export interface Idata extends Idate {
    key: number;
}
