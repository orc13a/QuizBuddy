export const timeCountUp = (inputSeconds) => {
    let timeArr = ["0", "00", "00"];
    let time = `${timeArr[0]}:${timeArr[1]}:${timeArr[2]}`;

    var totalSeconds = inputSeconds;
    setInterval(setTime, 1000);

    function setTime() {
        ++totalSeconds;
        timeArr[2] = convertSec(totalSeconds % 60);
        timeArr[1] = convertMin(parseInt(totalSeconds / 60));
        timeArr[0] = convertHour(parseInt((totalSeconds / 60) / 60));
    }
    
    function convertSec(value) {
        var valueString = value + "";
        if (valueString.length < 2) {
            return "0" + valueString;
        } else {
            return valueString;
        }
    }
    
    function convertMin(value) {
        var valueString = (value % 60) + "";
        if (valueString.length < 2) {
            return "0" + valueString;
        } else {
            return valueString;
        }
    }
    
    function convertHour(value) {
        var valueString = value + "";
        return valueString;
    }

    return time;
}