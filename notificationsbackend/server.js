const express = require('express');
const webpush = require('web-push');
const cors = require('cors');
const bodyParser = require('body-parser');

const PUBLIC_VAPID = 
  'BCpUjGH5GSvUeMqI33Xh5xe6BA-awWgTS6B82j6V6GYUsVATgT41qeAJ67fZ1F5srSzt6VXu3cG6slBKpgX_IAA';
const PRIVATE_VAPID =
  'vOJawCw2OOTUjXjeFiIp5GHPcNXlVzWCXIHd2twPBbs';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fakeDatabase = [];

app.use(cors());


webpush.setVapidDetails("mailto:nagappan08@gmail.com", PUBLIC_VAPID, PRIVATE_VAPID);

app.listen(3000, () => { console.log("server started on port 3000"); });

app.get('/', (req, res) => {
    //res.render('index');
	res.sendFile('index.html', {root: __dirname });
});

app.post('/startRecurringNotifications', (req, res) => {
    console.log('setRecurring notifications');
    startNotification();
    res.sendStatus(200);
});

app.post('/stopRecurringNotifications', (req, res) => {
    console.log('stop recurring notifications');
    clearInterval(intervalObj);
    res.sendStatus(200);
});


app.post('/subscription', (req, res) => {
	fakeDatabase.push(req.body);
	console.log(fakeDatabase);
	res.sendStatus(200);

});

app.post('/sendNotification', (req, res) => {
    console.log(req.body);
	const notificationPayload = {
		notification: {
			title: req.body.title,
			body: req.body.body,
			icon: 'assets/icons/icon-512*512.png',
	}};
    console.log("notificationpayload");
	const promises = [];
	fakeDatabase.forEach(subscription => {
	    console.log(JSON.stringify(notificationPayload));
		promises.push(webpush.sendNotification(subscription, JSON.stringify(notificationPayload)));
	});
	Promise.all(promises).then(() => res.sendStatus(200));
});
var intervalObj;

function startNotification() {
    intervalObj = setInterval(function(){
        const notificationPayload = {
                notification: {
                    title: 'New Notification',
                    body: 'This is notification body',
                    icon: 'assets/icons/icon-512*512.png',
            }};

        fakeDatabase.forEach(subscription => {
                console.log("sending notifications");
                console.log(subscription);
                webpush.sendNotification(subscription, JSON.stringify(notificationPayload));
            });
    }, 5000);
}


