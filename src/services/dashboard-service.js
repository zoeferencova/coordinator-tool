import { json } from 'd3';
import config from '../config';

const DashboardService = {
    getMinutes(item) {
        let minutes = 0;
        if (item.difference.months) {
            minutes += item.difference.months * 4 * 7 * 24 * 60
        }
        if (item.difference.weeks) {
            minutes += item.difference.weeks * 7 * 24 * 60
        }
        if (item.difference.days) {
            minutes += item.difference.days * 24 * 60
        }
        if (item.difference.hours) {
            minutes += item.difference.hours * 60
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
        const hour = Number(item) / 60
        return { hour: parseInt(hour), minute: parseInt(minute) }
    },
    async getDashboardData() {
        const urls = [
            `${config.API_ENDPOINT}/data/timespan-data/created/days`,
            `${config.API_ENDPOINT}/data/pm-data`,
            `${config.API_ENDPOINT}/data/time-completed-data`,
            `${config.API_ENDPOINT}/data/dashboard-data`
        ]

        const data = await Promise.all(urls.map(async url => {
            const resp = await json(url, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } });
            return resp;
        }));

        return data;
    },
    getTimespanData(type, span) {
        return json(`${config.API_ENDPOINT}/data/timespan-data/${type}/${span}`, { headers: { "Authorization": `Bearer ${window.sessionStorage.getItem(config.TOKEN_KEY)}` } })
    }
}

export default DashboardService;