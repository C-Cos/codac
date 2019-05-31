import axios from 'axios';

export const addevent = newEvent => {
    return axios
        .post('http://localhost:4242/events/addevent', {
            username: newEvent.username,
            name: newEvent.name,
            desc: newEvent.desc,
            category: newEvent.sport,
            address: newEvent.address,
            zipcode: newEvent.zipcode,
            city: newEvent.city,
            start_time: newEvent.startHr,
            end_time: newEvent.endHr,
            start_date: newEvent.startDate,
            end_date: newEvent.endDate
        })
        
}