import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class DataService {

    username = '';
    getUserName(element: any) {
        return this.username = element;
    }
    getUserNamxe() {
        return this.username;
    }
    user: any;
    setUser(element: any) {
        this.user = element;
    }

    getUser() {
        return this.user;
    }


    jobsneed: any;
    setjobsneed(element: any) {
        this.
            jobsneed = element;
    }

    getjobsneed() {
        return this.
            jobsneed;
    }
}
