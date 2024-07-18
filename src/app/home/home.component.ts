import {Component, OnInit} from '@angular/core';
import {Course} from "../model/course";
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retry, retryWhen, shareReplay, take, tap} from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');
        const courses$: Observable<Course[]> = http$.pipe(
            catchError(err => {
                console.log(err);
                return throwError(err)
            }),
            finalize(() => console.log('final invoked rxjs')),
            tap(() => console.log('http request')),
            map(res => res['payload']),
            shareReplay(),
            retryWhen(errors => errors.pipe(
                delayWhen(() => timer(2000))
            ))
        );

        this.beginnerCourses$ = courses$.pipe(
            map(courses => courses.filter(c => c.category === 'BEGINNER'))
        )

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(c => c.category === 'ADVANCED'))
        )

    }

}
