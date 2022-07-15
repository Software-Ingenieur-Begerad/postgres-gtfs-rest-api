const debug=require('debug')('debug');
function getCalendarMap(){
    //debug('calendar start...');
    //get date of today without hours
    const todayNoHours=new Date(new Date().toDateString());
    //debug('calendar todayNoHours: '+todayNoHours);

    const todayNoHoursTs=todayNoHours.getTime();
    //debug('calendar todayNoHoursTs: '+todayNoHoursTs);

    //get date before 28 days
    const before28DaysDate=new Date(new Date(todayNoHours).setDate(todayNoHours.getDate() - 28));
    //debug('calendar before28DaysDate: '+before28DaysDate);

    const before28DaysDateTs=before28DaysDate.getTime();
    //debug('calendar before28DaysDateTs: '+before28DaysDateTs);

    //get date after 28 days
    const after28DaysDate=new Date(new Date(todayNoHours).setDate(todayNoHours.getDate() + 28));
    //debug('calendar after28DaysDate: '+after28DaysDate);

    const after28DaysDateTs=after28DaysDate.getTime();
    //debug('calendar after28DaysDateTs: '+after28DaysDateTs);

    const mapCalendar=new Map();
    const dayString='day';
    //set dates for week 28 days before
    for(var i=-28;i<-24;i++){
	const date=new Date(new Date(todayNoHours).setDate(todayNoHours.getDate() + i));
	const dateTs=date.getTime();
	//debug('calendar week28DaysBefore: '+dateTs);
	mapCalendar.set(dayString+i,dateTs);
    }
    //set dates for this week
    for(var i=0;i<4;i++){
	const date=new Date(new Date(todayNoHours).setDate(todayNoHours.getDate() + i));
	const dateTs=date.getTime();
	//debug('calendar thisWeek: '+dateTs);
	mapCalendar.set(dayString+i,dateTs);
    }
    //set dates for week 28 days after
    for(var i=28;i<32;i++){
	const date=new Date(new Date(todayNoHours).setDate(todayNoHours.getDate() + i));
	const dateTs=date.getTime();
	//debug('calendar week28DaysAfter: '+dateTs);
	mapCalendar.set(dayString+i,dateTs);
    }
    //debug('calendar done.');
    return mapCalendar;
};
module.exports = {
    getCalendarMap
}
