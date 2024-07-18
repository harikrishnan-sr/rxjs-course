import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay,
    debounce,
    exhaustMap
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat} from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {


    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;
    courseId: String;

    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

         this.courseId = this.route.snapshot.params['id'];

        this.course$ = <Observable<Course>>createHttpObservable(`/api/courses/${this.courseId}`)

        

    }

    ngAfterViewInit() {

         this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
         .pipe(
             map(e => e.target.value),
             startWith(''),
             debug(RxJsLoggingLevel.DEBUG, 'search '),
             debounceTime(400),
             distinctUntilChanged(),
             switchMap(searchTerm => this.loadLessons(searchTerm))
         )

    }


    loadLessons(searchTerm = ''): Observable<Lesson[]> {
        return <Observable<Lesson[]>>createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${searchTerm}`)
        .pipe(
            map(res => res['payload'])
        )
    }




}
