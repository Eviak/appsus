import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const mailService = {
    query,
    setOnRead,
    sendMail,
}

const MAIL_KEY = 'mailDB'
const DATE = new Date()

const gMail = storageService.loadFromStorage(MAIL_KEY) || _createMails().reverse() //this name made me laugh
const loggedInUser = {
    mail: 'puki@lala.com',
    fullName: 'Puki Lala'
}

function query(criteria) {
    let mails = gMail
    console.log(criteria)
    if (criteria){
        console.log('I am in the filter')
        mails = mails.filter(mail => {
            return mail.subject.toLowerCase().includes(criteria.toLowerCase()) ||
            mail.body.toLowerCase().includes(criteria.toLowerCase()) ||
            mail.to.toLowerCase().includes(criteria.toLowerCase()) ||
            mail.fullName.toLowerCase().includes(criteria.toLowerCase())
        })
    }
    return Promise.resolve(mails)
}

function setOnRead(id) {
    const idx = gMail.findIndex(mail => mail.id === id)
    gMail[idx].isRead = true
    console.log(gMail[idx])
}

function sendMail(sendParams) {
    const mail = _createMail(sendParams)
    gMail.unshift(mail)
    storageService.saveToStorage(MAIL_KEY,gMail)
}


function _createMail(sendParams) {
    const { to, subject, body } = sendParams
    const mail = {
        id: `m${utilService.makeId()}`,
        subject,
        body,
        isRead: false,
        isStarred: false,
        isTrash: false,
        sentAt: DATE.getTime(),
        to,
        fullName: to
    }
    return mail
}



function _createMails() {
    return [
        {
            id: `m${utilService.makeId()}`,
            subject: 'First email!',
            body: 'This is the first email sent, what an achivement!',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1645114035,
            to: 'puki@lala.com',
            fullName: 'Muki Lala'
        },

        {
            id: `m${utilService.makeId()}`,
            subject: 'I had to Try it Again!',
            body: 'Yup still works, what an achivement!',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1645121884,
            to: 'puki@lala.com',
            fullName: 'Muki Lala'
        },

        {
            id: `m${utilService.makeId()}`,
            subject: 'Please Stop!',
            body: 'Stop sending me emails!',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1645122078,
            to: 'muki@lala.com',
            fullName: 'Puki Lala'
        },

        {
            id: `m${utilService.makeId()}`,
            subject: 'For Some Reason',
            body: 'The Title for the previous email is out of whack',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1645122078,
            to: 'muki@lala.com',
            fullName: 'Puki Lala'
        },

        {
            id: `m${utilService.makeId()}`,
            subject: 'Word',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum erat a commodo dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum iaculis est et fringilla vehicula. ',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1645122078,
            to: 'muki@lala.com',
            fullName: 'Puki Lala'
        },

    ]
}