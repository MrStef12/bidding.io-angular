import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import * as io from 'socket.io-client';

import { Auction } from './auction';

@Component({
    moduleId: module.id,
    selector: 'auction',
    templateUrl: 'auction.component.html'
})
export class AuctionComponent implements OnInit, OnDestroy {

    private url: string = window.location.hostname + ":9998";
    private socket: SocketIOClient.Socket;
    private sub: any;
    private ready: boolean = false;
    private auctionInfo: Auction;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            var id = +params['aId'];
            var url = this.url + "/auction/" + id;
            console.log(url);
            this.socket = io.connect(url);
            this.socket.on("auctionInfo", (info: any) => {
                this.auctionInfo = info.json();
            })
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}