module.exports.getCurrentDate = function(day){
    let currentDate = new Date();
    currentDate.setDate(day);
    console.log(currentDate.getDay());
    switch(currentDate.getDay()){
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        default:
            return 'Saturday';
    }
}
