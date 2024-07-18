import { Observable } from "rxjs";
import { Course } from "../model/course";

export function createHttpObservable(url: string) {
  return new Observable((observer) => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, { signal })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          observer.error('Request failed with status code: ' + resp.status)
        }
        
      })
      .then((json) => {
        observer.next(json);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });

      return () => controller.abort();
  });
}
