const DashboardService = {
    getMinutes(item) {
        let minutes = 0;
        if (item.difference.months) {
            minutes += item.difference.months*4*7*24*60 
        }
        if (item.difference.weeks) {
            minutes += item.difference.weeks*7*24*60
        }
        if (item.difference.days) {
            minutes += item.difference.days*24*60 
        }
        if (item.difference.hours) {
            minutes += item.difference.hours*60
        }
        if (item.difference.minutes) {
            minutes += item.difference.minutes
        }
        if (item.difference.seconds) {
            minutes += 0
        }
        item = minutes

        return item
    },
    getHourMinute(item) {
        const minute = Number(item) % 60;
        const hour = Number(item)/60
        return { hour: parseInt(hour), minute: parseInt(minute) }
    }
}

export default DashboardService;