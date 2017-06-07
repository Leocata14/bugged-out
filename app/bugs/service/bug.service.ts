import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {FirebaseConfigService} from '../../core/service/firebase-config.service';

import { Bug } from '../model/bug';

@Injectable()
export class BugService {

    private bugsDBRef = this.fire.database.ref().child('bugs');

    constructor(private fire: FirebaseConfigService) { }

    getAddedBugs():Observable<any> {
        return Observable.create(obs => {
            this.bugsDBRef.on('child_added', bug => {
                const newBug = bug.val() as Bug;
                obs.next(newBug);
            },
            err => {
                obs.throw(err);
                
            });
        });
    }
}