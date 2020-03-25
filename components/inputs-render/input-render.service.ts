import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InputRenderServices {

    getValue = new Subject<{}>()
    values: {}
    constructor() {
        this.values = {}
    }

    storeValue(key, value): Observable<any>{
        // console.log({key, value})
        this.values[key] = value
        this.getValue.next(this.values)
        return 
    }
}