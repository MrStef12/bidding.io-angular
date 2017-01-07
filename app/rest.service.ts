import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Auction } from './auction';

@Injectable()
export class RestService {

    private url = "http://"+window.location.hostname+":9998";

    constructor(private http: Http) { }

    getAuctions(): Promise<Auction[]> {
        return this.http.get(this.url+"/auctions")
            .toPromise()
            .then(response => response.json() as Auction[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}