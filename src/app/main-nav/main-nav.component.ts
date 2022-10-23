import {Component, OnDestroy, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Subscription} from "rxjs";
import {ProductSubmissionService} from "../product-submission.service";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent  implements OnInit, OnDestroy{

  private authListenerSubs!: Subscription;
  userIsAuthenticated = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    isWeb$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Web)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public authService: ProductSubmissionService) {}

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().
    subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    })
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

}
