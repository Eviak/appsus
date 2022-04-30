export const utilService = {
    makeId,
    createHours,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function createHours(date) {
    const time = [date.getHours(), date.getMinutes()]
    const suffix = (time[0] < 12) ? "AM" : "PM"
    time[0] = (time[0] < 12) ? time[0] : time[0] - 12
    time[0] = time[0] || 12
    if (time[1] === 0) time[1] = '00'
    return `${time.join(':')} ${suffix}`
}