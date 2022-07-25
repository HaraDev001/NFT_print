export const compareDate = (a, b) => {
    if ( a.getFullYear() > b.getFullYear() ) { return 1; }
    if ( a.getFullYear() < b.getFullYear() ) { return -1; }
    if ( a.getMonth() > b.getMonth() ) { return 1; }
    if ( a.getMonth() < b.getMonth() ) { return -1; }
    if ( a.getDate() > b.getDate() ) { return 1; }
    if ( a.getDate() < b.getDate() ) { return -1; }
    return 0;
}

export const getDayFormatFrom = (d) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()] + " " + d.getDate() + " " + d.getFullYear();
}

export const getDataBetween = (dateFrom, dateTo, p_data) => {
    const result = p_data.filter(val => {
        return (new Date(val.date) <= new Date(dateTo) && new Date(val.date) >= new Date(dateFrom))
    })
    return result
}

export const getDataByDay = (p_data) => {
    const data = [];
    const dates = [];
    p_data.map((val, index) => {
        dates.push(new Date(val.date));
        return 1;
    })
    dates.sort(compareDate);
    let filter_dates = [];
    for( let i = 0 ; i < dates.length ; i++) {
        let flag = true;
        filter_dates.map( val => {
            if( getDayFormatFrom(val) === getDayFormatFrom(dates[i]) ) {
                flag = false;
            }
            return 1;
        })
        if ( flag === true) {
            filter_dates.push(dates[i])
        }
    }
    filter_dates.map(val => {
        let price = 0;
        p_data.map(value => {
            if ( getDayFormatFrom(val) === getDayFormatFrom(new Date (value.date)) ) {
                price += parseFloat(value.pay);
            }
            return 1;
        })
        data.push({date: getDayFormatFrom(val), price: price.toFixed(3)})
        return 1;
    })
    return data;
}

export const getTotalRevenueFrom = (p_data) => {
    let total = 0;
    p_data.map((val, index) => {
        total += parseFloat(val.pay);
        return 1;
    })
    return total.toFixed(2);
}

export const getDailyAvg = (p_data) => {
    const dates = [];
    p_data.map((val, index) => {
        dates.push(new Date(val.date));
        return 1;
    })
    dates.sort(compareDate);
    let filter_dates = [];
    for( let i = 0 ; i < dates.length ; i++) {
        let flag = true;
        filter_dates.map( val => {
            if( getDayFormatFrom(val) === getDayFormatFrom(dates[i]) ) {
                flag = false;
            }
            return 1;
        })
        if ( flag === true) {
            filter_dates.push(dates[i])
        }
    }
    let sum = 0;
    p_data.map(value => {
        sum += parseFloat(value.pay);
        return 1;
    })
    return (sum / filter_dates.length).toFixed(3);
}

export const drawComma = (str) => {
    const temp = str.toString().split(".");
    let pos = temp[0].length % 3;
    let result = "", c = 0;
    if ( pos === 0) { pos = 3; }
    for( let i = 0 ; i < temp[0].length ; i++) {
        result += temp[0][i];
        c++;
        if( c === pos && i !== (temp[0].length - 1)) {
            result += ","
            pos += 3;
        }
    }
    if ( temp.length === 1) {
        return result;
    }
    else {
        return result + "." + temp[1];
    }
}

export const getMonthAgoPrice = (p_data, month) => {
    let sum = 0;
    const limitFrom = new Date();
    limitFrom.setMonth(new Date().getMonth() - month);
    limitFrom.setDate(1);
    p_data.map((val, index) => {
        if ( new Date(val.date) >= limitFrom && new Date(val.date) <= new Date()) {
            sum += parseFloat(val.pay);
        }
        return 1;
    })
    return sum.toFixed(3);
}

export const getWeekAgo = (p_data) => {
    let sum = 0;
    const limitFrom = new Date();
    limitFrom.setDate(new Date().getDate() - 7);
    p_data.map(val => {
        if ( new Date(val.date) >= limitFrom && new Date(val.date) <= new Date()) {
            sum += parseFloat(val.pay);
        }
        return 1;
    })
    return sum.toFixed(3);
}

export const getDayAgoPrice = (p_data, day) => {
    let sum = 0;

    const limitFrom = new Date();
    limitFrom.setDate(limitFrom.getDate() - day);
    limitFrom.setHours(0); limitFrom.setMinutes(0); limitFrom.setSeconds(0);

    const limitTo = new Date();
    limitTo.setDate(limitTo.getDate() - day);
    limitTo.setHours(23); limitTo.setMinutes(59); limitTo.setSeconds(59);

    p_data.map(val => {
        if ( new Date(val.date) >= limitFrom && new Date(val.date) <= limitTo) {
            sum += parseFloat(val.pay);
        }
        return 1;
    })
    return sum.toFixed(3);
}