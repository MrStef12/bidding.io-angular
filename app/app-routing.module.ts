import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FrontpageComponent } from './frontpage.component';
import { AuctionComponent } from './auction.component';

const routes: Routes = [
    { path: '', component: FrontpageComponent },
    { path: 'auction/:aId', component: AuctionComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
