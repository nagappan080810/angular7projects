import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Logger{
    logs: string[] = [];

    log(message: string) {
        this.logs.push(message);
        console.log(message);
    }
}
