import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { concat, EmptyError, fromEvent, interval, merge, noop, Observable, of, throwError, timer } from "rxjs";
import { createHttpObservable } from "../common/util";
import { map } from "rxjs/operators";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const http$ = createHttpObservable('/api/courses')

    const sub = http$.subscribe();

    setTimeout(() => sub.unsubscribe(), 0);


  }
}
