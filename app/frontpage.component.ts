import { Component, OnInit, OnDestroy } from '@angular/core';

import { Auction } from './auction';
import { RestService } from './rest.service';

@Component({
    moduleId: module.id,
    selector: 'frontpage',
    templateUrl: 'frontpage.component.html'
})
export class FrontpageComponent implements OnInit, OnDestroy {

    private auctions: Auction[] = [];
    private error: boolean = false;
    private reloadInterval: number = 2000;
    private timerId: NodeJS.Timer;

    constructor(private restService: RestService) {}

    ngOnInit(): void {
        this.refreshData();
        this.timerId = setInterval(() => this.refreshData(), this.reloadInterval);
    }

    ngOnDestroy(): void {
        clearInterval(this.timerId);
    }

    refreshData(): void {
        this.restService.getAuctions()
            .then(auctions => this.auctions = auctions)
            .catch((error) => {
                this.error = true;
                clearInterval(this.timerId);
                console.error("REST returned an error.",error);
            });
    }

    public convertDate(input: string): string {
        var date: Date = new Date(input);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
}