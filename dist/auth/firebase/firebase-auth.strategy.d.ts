import { Strategy } from 'passport-firebase-jwt';
declare const FirebaseAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class FirebaseAuthStrategy extends FirebaseAuthStrategy_base {
    private defaultApp;
    constructor();
    validate(token: string): Promise<any>;
}
export {};
