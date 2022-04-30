import { storageService } from "../../../services/storage.service.js";
import { utilService } from "../../../services/util.service.js";

export const mailService = {
    query,
    onSetToggle,
    sendMail,
    getMailById,
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
    if (criteria){
        mails = mails.filter(mail => {
            return mail.subject.toLowerCase().includes(criteria.toLowerCase()) ||
            mail.body.toLowerCase().includes(criteria.toLowerCase()) ||
            mail.to.toLowerCase().includes(criteria.toLowerCase()) ||
            mail.fullName.toLowerCase().includes(criteria.toLowerCase())
        })
    }
    return Promise.resolve(mails)
}

function onSetToggle(id,field) {
    const idx = gMail.findIndex(mail => mail.id === id)
    if (field === 'isStarred' && gMail[idx].isStarred) gMail[idx].isStarred = false 
    else if(field === 'isTrash' && gMail[idx].isTrash) _deleteMail(idx)  
    else gMail[idx][field] = true    
}

function sendMail(sendParams) {
    const mail = _createMail(sendParams)
    gMail.unshift(mail)
    storageService.saveToStorage(MAIL_KEY,gMail)
}

function getMailById(id){
    return Promise.resolve(gMail.filter(mail => mail.id === id))
}


function _deleteMail(idx){
    gMail.splice(idx,1)
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
        sentAt: DATE.getTime()/1000,
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
            sentAt: 1645348629,
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
            id: `mWrda2i`,
            subject: 'Word',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla fermentum erat a commodo dignissim. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum iaculis est et fringilla vehicula. ',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651306760,
            to: 'muki@lala.com',
            fullName: 'Puki Lala'
        },

        {
            id: `m${utilService.makeId()}`,
            subject: 'A very important Letter',
            body: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et consectetur sem. Sed bibendum libero quis tellus sodales, et rhoncus mauris dignissim. Maecenas rutrum nisi orci, cursus faucibus urna sollicitudin bibendum. Cras non placerat ante, id lobortis ipsum. Sed ac risus congue, placerat lacus quis, fermentum est. Vivamus gravida massa vel tortor volutpat, a hendrerit mi ultricies. Proin venenatis purus sit amet scelerisque accumsan. Aenean ac bibendum nulla. Maecenas sit amet sapien ac risus facilisis tristique. Mauris aliquam congue arcu quis tristique. Vivamus ac velit in nibh tincidunt porta. Vivamus sodales tincidunt sapien vitae posuere. Maecenas sed erat in elit aliquet feugiat euismod id urna. Integer in vehicula nulla. Morbi non dapibus felis, tincidunt interdum metus.

Nulla in lacinia sapien. Cras ultrices urna nec lectus tempor, at eleifend lacus semper. Integer malesuada in purus in condimentum. Integer massa dui, consequat blandit odio vel, rutrum commodo risus. Integer feugiat lacinia dolor. Phasellus sagittis tincidunt ultrices. Nunc vel massa lectus. Quisque accumsan eros sed pulvinar rhoncus. Aenean ornare metus quam, nec accumsan nisl sagittis et. Maecenas non ex non tellus tincidunt placerat bibendum at tellus. Etiam dolor eros, luctus ac nisi ac, hendrerit convallis leo. Fusce vel nisl aliquet, mattis libero dapibus, luctus erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur at sem id lacus lobortis suscipit. Phasellus bibendum turpis id dui efficitur luctus. Phasellus eleifend lorem vel eleifend elementum.

Vivamus euismod lorem ac tincidunt luctus. Nulla facilisi. Sed sapien risus, faucibus in tincidunt vel, sagittis a quam. Vivamus feugiat auctor gravida. Phasellus maximus malesuada erat in varius. Suspendisse potenti. Fusce at felis eu ipsum dapibus maximus eget eget lectus. Nullam consequat faucibus velit, quis congue enim tristique ac. Ut blandit orci sit amet neque ultrices, vitae aliquam massa condimentum.

Nulla non neque et diam interdum fringilla. Donec suscipit maximus mauris vitae faucibus. Nulla sagittis mi in lacus dictum euismod. Vivamus congue egestas mattis. Nunc magna diam, viverra vel massa non, condimentum pretium lacus. Vestibulum ultrices lobortis odio vel aliquet. In hac habitasse platea dictumst. Suspendisse potenti. Aenean accumsan quam vel nibh convallis, id elementum nulla elementum. Cras interdum libero ante, vel lobortis nibh aliquam in. Vivamus arcu augue, ultrices vitae mauris ac, vulputate condimentum erat. Vestibulum turpis quam, pellentesque sit amet aliquam nec, cursus in nisi. Praesent tempor pellentesque mauris non elementum.

In ac aliquam diam. Nullam sed risus sed dolor facilisis commodo. Maecenas pellentesque ullamcorper imperdiet. Nullam efficitur nisl vel orci imperdiet ornare. Aenean non gravida erat. Sed finibus porta mauris in dapibus. Sed malesuada tellus eu sapien tempus iaculis. Etiam scelerisque interdum nisl. Proin tempus sagittis venenatis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla dapibus, risus eget mollis pulvinar, ligula est efficitur libero, non consectetur ligula diam at augue. Phasellus consectetur nunc magna, a euismod magna sodales eget. Donec malesuada suscipit pellentesque. Nunc a condimentum quam, nec suscipit metus.

Cras molestie quam eu nisi malesuada, in suscipit nisi dapibus. Phasellus vel augue vel lacus dignissim pellentesque. Fusce blandit arcu at nunc tristique, quis maximus mauris ornare. Nam tincidunt a lectus vel condimentum. Ut congue risus purus, eget pharetra purus auctor at. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam viverra quis urna et imperdiet. Integer egestas, quam vitae imperdiet placerat, mi justo pellentesque ante, ac sodales ex quam sit amet tellus. Fusce dictum auctor sem, sed commodo turpis ultricies ut. Nullam in ex ut metus efficitur consectetur eget vel dui. Quisque pretium fringilla ex ut sodales.

Curabitur iaculis suscipit arcu, tincidunt egestas nisi interdum lacinia. Integer eget nunc dui. Fusce sit amet finibus tortor. Nam varius congue feugiat. Donec felis ex, egestas non laoreet ac, rhoncus non nibh. Fusce finibus nisi quis quam luctus, id dignissim magna vehicula. Duis porttitor interdum orci, at iaculis mi sollicitudin id. Quisque sed mi purus. Curabitur augue leo, luctus hendrerit velit ut, ornare posuere tortor. Ut vitae ex a elit pellentesque ullamcorper. Quisque vulputate porttitor nisl ac pulvinar. Donec iaculis maximus orci, sed imperdiet arcu viverra sed.

Aliquam porta, elit sit amet consequat commodo, leo nunc interdum eros, eget sodales mauris mi sed purus. Vestibulum interdum nisi vel scelerisque congue. Nulla nec vehicula justo, ac mollis tortor. Nunc mauris ex, varius a eros eget, congue lobortis tellus. Vestibulum ut lobortis sem. Fusce porttitor risus ac dapibus sollicitudin. Suspendisse tristique erat quam, eu condimentum lacus luctus sagittis. Nam orci nisl, malesuada eu ante consectetur, porta convallis neque. Duis diam dui, aliquam ac finibus nec, dictum at nulla. Etiam facilisis eros sed lorem efficitur tincidunt. In malesuada augue ut porta condimentum. Etiam interdum libero finibus augue pellentesque commodo eget in elit. Suspendisse elit lacus, vulputate at blandit ac, tincidunt laoreet nisi. Curabitur lorem libero, posuere in cursus in, commodo ut ex. Donec aliquet, leo congue auctor convallis, sapien nunc malesuada ligula, vel viverra enim nunc a turpis.

Quisque efficitur sed odio sed tincidunt. Maecenas vitae est purus. Morbi ut lectus mollis, imperdiet tortor sit amet, sagittis ipsum. Integer sit amet urna egestas, rutrum nisl sit amet, posuere arcu. Phasellus nec ante tincidunt, consequat est vitae, lacinia erat. Duis scelerisque, velit sed convallis pellentesque, mi arcu tincidunt risus, ac consequat quam erat in justo. Aenean at placerat justo. Suspendisse eget viverra mauris, et varius risus.

Quisque vulputate dui libero, ut egestas leo luctus at. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer sed mattis diam. Sed id tortor dui. Aliquam suscipit nec dui ac suscipit. Integer sit amet tellus convallis, rhoncus sapien in, convallis arcu. Nunc congue vitae ante in faucibus.

Aenean dapibus pellentesque consectetur. Duis imperdiet felis a augue bibendum, vulputate interdum ligula scelerisque. Sed vitae ante a elit luctus suscipit. Nam tincidunt sit amet dolor vitae volutpat. Mauris dignissim, magna vitae fermentum imperdiet, elit velit lobortis orci, quis lobortis ligula erat id ipsum. Aliquam orci orci, bibendum vitae turpis et, interdum cursus risus. Quisque tempor purus sit amet ultrices molestie. Donec sed malesuada tellus. In vel felis purus. Mauris lobortis condimentum massa, in rhoncus mauris porttitor in. Morbi efficitur turpis sagittis magna pharetra luctus. Ut facilisis turpis ac velit aliquet, vitae maximus nisl egestas. Mauris mattis felis ac mauris dictum, non maximus magna semper. Phasellus in dignissim massa.

Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus libero urna, efficitur in nunc id, scelerisque facilisis mauris. Vestibulum nunc ante, sollicitudin eget gravida ac, cursus quis urna. Proin sodales, nunc ac ornare tincidunt, lectus felis sagittis augue, nec finibus justo felis nec turpis. Nullam sit amet enim lacus. Donec ligula turpis, ullamcorper quis mollis at, dictum quis lacus. Phasellus ullamcorper bibendum laoreet. Etiam eget dui non metus mollis imperdiet eu molestie magna. Duis ultrices velit in metus luctus, eget posuere est vestibulum. Nam pellentesque hendrerit dolor in tristique. Donec eget dignissim ante, vitae sollicitudin augue.

Curabitur bibendum leo at quam efficitur varius. Nullam eget mauris felis. Suspendisse potenti. Suspendisse malesuada aliquam lacus, quis ultricies erat. Suspendisse tortor est, facilisis vulputate mi at, tincidunt eleifend tortor. Maecenas iaculis a diam sit amet lacinia. Duis tellus risus, egestas et lacus a, porta scelerisque magna. Mauris efficitur varius laoreet. Quisque pulvinar pulvinar elit, vitae porta justo pretium et. Donec gravida, sem a imperdiet placerat, orci nulla convallis nisl, sit amet aliquam lacus dui eget urna. Nulla suscipit ultricies neque, ut aliquam purus efficitur at. Ut facilisis bibendum magna sit amet rutrum. Sed interdum, ipsum vitae eleifend rutrum, ex sapien lobortis lectus, rhoncus finibus sapien mauris ac metus.

Praesent lacinia accumsan porttitor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec ut mi dignissim, pulvinar mauris at, auctor ipsum. Aenean varius purus sed velit malesuada blandit. Integer venenatis felis efficitur leo facilisis consequat. Curabitur nec dignissim eros. Donec quis laoreet diam. Nunc nec tortor risus. Nullam volutpat mauris ac cursus sodales. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer mollis quam nibh, quis laoreet magna aliquam eu. Vestibulum eu consequat nunc. Nulla blandit purus quis felis posuere, at porttitor nibh finibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla malesuada, dolor ac consequat feugiat, neque justo tristique metus, nec feugiat eros tellus vel ex. Vivamus eget congue orci.

Fusce vehicula diam ut dui hendrerit, eget fermentum massa hendrerit. Etiam condimentum ultrices nisi eget bibendum. Etiam nibh diam, commodo at iaculis non, sollicitudin sed sem. Cras nunc est, mollis nec lacus quis, dignissim pretium tellus. Duis congue porta orci, elementum varius erat. Curabitur tincidunt faucibus iaculis. Phasellus sodales, tortor nec dictum efficitur, lacus lacus sollicitudin odio, finibus congue libero sapien ac sem. Maecenas pretium, diam et congue posuere, nibh urna convallis purus, eget sagittis odio ipsum vel ex. Suspendisse sodales est vel nulla auctor, vitae malesuada leo commodo. Morbi eu lacus volutpat, accumsan arcu vehicula, pulvinar arcu. Donec et elit ornare, vestibulum orci ut, bibendum nisl. `,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651297160,
            to: 'muki@lala.com',
            fullName: 'Puki Lala'
        },

    ]
}