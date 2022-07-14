const debug=require('debug')('debug');
function getCalendarMap(){
    debug('calendar start...');
    //get date of today without hours
    const todayNoHours=new Date(new Date().toDateString());
    debug('calendar todayNoHours: '+todayNoHours);

    const todayNoHoursTs=todayNoHours.getTime();
    debug('calendar todayNoHoursTs: '+todayNoHoursTs);

    //get date before 7 days
    const before7DaysDate=new Date(new Date(todayNoHours).setDate(todayNoHours.getDate() - 7));
    debug('calendar before7DaysDate: '+before7DaysDate);

    const before7DaysDateTs=before7DaysDate.getTime();
    debug('calendar before7DaysDateTs: '+before7DaysDateTs);

    //get date after 7 days
    const after7DaysDate=new Date(new Date(todayNoHours).setDate(todayNoHours.getDate() + 7));
    debug('calendar after7DaysDate: '+after7DaysDate);

    const after7DaysDateTs=after7DaysDate.getTime();
    debug('calendar after7DaysDateTs: '+after7DaysDateTs);

    const mapCalendar=new Map();
    mapCalendar.set('before7Days',before7DaysDateTs);
    mapCalendar.set('today',todayNoHoursTs);
    mapCalendar.set('after7Days',after7DaysDateTs);
    debug('calendar done.');
    return mapCalendar;
};
module.exports = {
    getCalendarMap
}
