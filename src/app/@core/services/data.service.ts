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

}
