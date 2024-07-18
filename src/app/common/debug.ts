import { Observable, observable } from "rxjs";
import { tap } from "rxjs/operators";

export enum RxJsLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR

}


let rxjsloggingLevel = RxJsLoggingLevel.INFO;

export function setRxjsLoggingLevel(level: RxJsLoggingLevel) {
    rxjsloggingLevel = level;
}

export const debug = (level: number, message: string) => (source: Observable<any>) => source.pipe(
    tap(val => {
        if(level >= rxjsloggingLevel) {
            console.log( 'Message: ', val);
        }
       
    })
)