import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

const VAPID_PUBLIC =
    'BCpUjGH5GSvUeMqI33Xh5xe6BA-awWgTS6B82j6V6GYUsVATgT41qeAJ67fZ1F5srSzt6VXu3cG6slBKpgX_IAA';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Push Notifications Demo';


  constructor(swpush: SwPush, pushNotificationService: PushNotificationService) {
    if (swpush.isEnabled) {
        swpush
            .requestSubscription({
                serverPublicKey: VAPID_PUBLIC
            })
            .then((subscription) => {
                console.log(subscription);
                pushNotificationService.sendSubscriptionToTheServer(subscription).subscribe((data)=>console.log(data));
            })
            .catch(console.error);
    }
  }
}
