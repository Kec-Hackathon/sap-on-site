import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root',
})
export class ActivityService {
    BACKEND_URL = environment.BACKEND_URL;
    activities: Subject<any[]> = new Subject<any[]>();

    constructor(private http: HttpClient) { }

    getActivityById(id: string) {
        return this.http.get<{ activity: any; message: string }>(
            `${this.BACKEND_URL}activity/${id}`
        );
    }

    getUserActivityByUserId(id: string) {
        this.http
            .get<{ activities: any[]; message: string }>(
                `${this.BACKEND_URL}activity/user-id/${id}`
            )
            .subscribe((res) => {
                if (res.activities.length > 0) {
                    this.activities.next(res.activities);
                } else {
                    this.activities.next([]);
                }
            });
    }

    getUserUpdatedActivity() {
        return this.activities.asObservable();
    }

    uploadNewActivity(activity: FormData) {
        return this.http.post<{ activity: any; message: string }>(
            `${this.BACKEND_URL}activity/`,
            activity
        );
    }

    updateLockStatus(id: string, status: boolean) {
        return this.http.put<{ success: boolean; message: string }>(
            `${this.BACKEND_URL}activity/lock-status/${id}`,
            { status: !status }
        );
    }

    deleteActivity(id: string) {
        return this.http.delete<{
            success: boolean;
            activity: any;
            message: string;
        }>(`${this.BACKEND_URL}activity/${id}`);
    }
}