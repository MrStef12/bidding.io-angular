import { Component, OnInit } from '@angular/core';

import { Auction } from './auction';
import { RestService } from './rest.service';

@Component({
    moduleId: module.id,
    selector: 'frontpage',
    templateUrl: 'frontpage.component.html'
})
export class FrontpageComponent implements OnInit {

    auctions: Auction[] = [];
    error: boolean = false;

    constructor(private restService: RestService) {}

    ngOnInit(): void {
        this.restService.getAuctions()
            .then(auctions => this.auctions = auctions)
            .catch(error => this.error = true);
    }
}