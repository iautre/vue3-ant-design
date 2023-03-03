const dataFormat = (e:any, fmt?: string): string => {
    let date = new Date(e)
    let toFormat = function (format?: string): string {
        let year = `${date.getFullYear()}`;
        let month = `${date.getMonth() + 1}`;
        if (month.length === 1) {
            month = `0${month}`;
        }
        let day = `${date.getDate()}`;
        if (day.length === 1) {
            day = `0${day}`;
        }

        let hours = `${date.getHours()}`;
        if (hours.length === 1) {
            hours = `0${hours}`;
        }
        let minutes = `${date.getMinutes()}`;
        if (minutes.length === 1) {
            minutes = `0${minutes}`;
        }
        let seconds = `${date.getSeconds()}`;
        if (seconds.length === 1) {
            seconds = `0${seconds}`;
        }

        return (format || "yyyy-MM-dd hh:mm:ss")
            .replace(/yyyy/g, year)
            .replace(/MM/g, month)
            .replace(/dd/g, day)

            .replace(/hh/g, hours)
            .replace(/mm/g, minutes)
            .replace(/ss/g, seconds);
    }
    //let date = new Date(parseInt(e)*1000)

    return toFormat(fmt)
}
const dataFormat2 = (time:any): string =>{
    const timeNow:number = new Date().getTime() / 1000
    var postTime = Number(time)
    var dtime = timeNow-postTime
    if(dtime<=0){
        return '刚刚'
    }else if(dtime<60){
        return dtime+'秒前'
    }else if(dtime<3600){
        return Math.ceil(dtime/60)+'分钟前'
    }else if(dtime<86400){
        return Math.ceil(dtime/60/60)+'小时前'
    }else if(dtime<259200){
        return Math.ceil(dtime/60/60/24)+'天前'
    }
    var date = new Date(postTime*1000)
    var fmt = 'yyyy-MM-dd hh:mm'
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o:any = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
    }
    return fmt
}
export default dataFormat2