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
    private auctionInfo: Auction;
    private bid: number;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.sub = this.route.params.subscribe(params => {
            var id = +params['aId'];
            var url = this.url + "/auction/" + id;
            this.socket = io.connect(url);
            this.socket.on("auctionInfo", (info: Auction) => {
                this.auctionInfo = info;
            });
            this.socket.on("priceUpdate", (newPrice: any) => {
                this.auctionInfo.price = +newPrice;
            })
        });
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.socket.disconnect();
    }

    onSubmit() {
        var bid = +this.bid;
        if(!isNaN(bid)) {
            this.socket.emit("placeBid", bid);
        } else {
            alert("Please type in a number.");
        }
    }

    public convertDate(input: string): string {
        var date: Date = new Date(input);
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    }
}