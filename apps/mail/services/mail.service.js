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
    storageService.saveToStorage(MAIL_KEY,gMail)
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
            subject: 'Mariah’s B&B',
            body: 'The B&B started life as a family business. Over the years, we’ve added a few additional family members to the family. The B&B was originally a family owned business. Over the years, there have been several family members who have joined the family. The B&B was originally a boutique hotel in the heart of downtown Kaunas, and we’ve taken it to the next level. We have grown the business to be one of the largest hotels in Kaunas.',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651416373,
            to: 'puki@lala.com',
            fullName: 'Mariah’s B&B'
        },
        
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Whitehaven Resort',
            body: 'We are delighted to welcome you to the world of luxury and hospitality at the B&B at Whitehaven, with its contemporary, contemporary styling, a sea of luxurious Italian marble and a sleek, contemporary yet cosy interior. Listed on Tripadvisor as one of the best hotels in the UK, and voted one of the Top 5 finest hotel suites in London in 2014, The Walsh Hotel is a 5-star luxury hotel and bar located in the centre of Whitehaven.',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651416373,
            to: 'puki@lala.com',
            fullName: 'Whitehaven Luxury Hotel'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'B&B Hamilton',
            body: 'We are committed to providing guests with the best possible ambiance, service and dining experience. We are happy to offer our guests discounts as we understand that this isn\'t cheap and therefore you may end up paying for it at the end. Below are just a few of the many discounts we offer. Our bed and breakfast will set you back a minimum of £800, which is the same price as a 1B&B, which will set you back £15,000.',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651414343,
            to: 'puki@lala.com',
            fullName: 'B&B Hamilton'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Comfortable evening for everyone',
            body: 'We are a family owned business and in 2009 we acquired our first B&B. Our business was never about the profit margin, but about creating the best experience for our guests, customers and employees. The B&B has grown to encompass a number of properties and we are now expanding across the UK. We have opened branches in cities such as Bristol, Norwich, Leeds, Manchester, Sheffield, Leeds, Birmingham and Coventry, and are looking to open more in the future.',
            isRead: false,
            isStarred: true,
            isTrash: false,
            sentAt: 1651417644,
            to: 'muki@lala.com',
            fullName: 'B&B Kings'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Tech conference grand opening',
            body: `We are a business and a fellowship based on innovation. This is our mission. We are a community of designers and developers who are not afraid of creating something new. We believe that creativity is always an important part of our lives. The power of design is unbalanced. We think that we have a lot of experience in the design field and we want to share that with our clients.
            We have a fantastic programme in design, branding and branding workshops. This year we will have a panel on how to get more people to take up design and a panel on how to design for social change. We will have a design competition and a design event! We are a social impact event, with all types of panels, workshops, panels, events and performances. We are a venue for people who want to promote social change and hope to be inspired.
            We also promote the conference as a way for the conference’s attendees to share their passion and inspiration in an environment which encourages collaboration. With over 400 exhibitors and over 250 well-established international brands in attendance, we support our partners and create a safe and inspiring space for attendees. At the conference, we also create a friendly and interactive environment for our exhibitors to share their ideas and projects. With conferences and conferences in general, I’m pretty sure it will be a lot of fun.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651417735,
            to: 'puki@lala.com',
            fullName: 'TechKT'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Get your coffee while it\'s hot!',
            body: `We serve coffee in cafes, restaurants and in our own shop. We offer the best coffee, the freshest coffee and the best service. We want to provide you with the best and most unique products, service and products. We love coffee. We believe coffee is one of the best foods we can have and we share that faith.
            We've seen the benefits of coffee and we want to create amazing products. We are passionate about the coffee industry. We want to see that continue for the future of the coffee industry. We want to help people enjoy coffee and make the world a better place. We want to take our coffee culture to a whole new level.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651417821,
            to: 'puki@lala.com',
            fullName: 'Caffè Marco'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Application for architect contest',
            body: 'I am an architect from the Philippines. I am working with projects from architectural design, industrial design, furniture design, and interior design. I love to design and build things that are cool. What I have done in the past: I have worked as a senior designer and architect at a firm in the Philippines. I have worked on a wide range of projects from residential design, office design, and residential design. I am also a web designer.',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651417951,
            to: 'muki@lala.com',
            fullName: 'Lauro'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Application for architect contest',
            body: 'I am a Professional Architect and Architect with an extensive experience in Architecture and Interior Designing. I have an extensive experience in commercial and residential architecture and interior design. I have completed projects with many different architectural firms and I am proud to say that I have been awarded with a number of architectural awards. I have been awarded with the prestigious award of “Budget Architecture Award”. I am passionate about Architecture and I love to build projects.',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651417991,
            to: 'puki@lala.com',
            fullName: 'John Smith'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Fitness retreats. Yoga for life.',
            body: `At We Change...Change it Up!, our mission is not only changing the world around you but also helping YOU change the world around YOUR body!
            We believe the body needs balance, and that's what we do best. We offer the following: Personal training and bootcamps. Group training. Fitness retreats. Personal training. Fitness retreats. Bikram Yoga. Personal training. Fitness retreats. Yoga for life. YNAB Yoga. Fitness retreats. Yoga for life. Iam Yoga. Fitness retreats. Yoga for life. Yoga for life. Yoga for life. Yoga for life.
            Yoga for life.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651418081,
            to: 'puki@lala.com',
            fullName: 'We Change...Change it Up GYM'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Yoga studio discount',
            body: `We believe that the best way to achieve results is by taking care of your self. Join us today! The Studio is a boutique fitness studio that offers a variety of group fitness classes, private sessions, boot camps and personal training. We are a small family owned yoga studio located in Westfield Cleveland, Ohio.
            We believe that the best way to achieve results is by taking care of your self. Join us today! The Studio is a boutique fitness studio that offers a variety of group fitness classes, private sessions, boot camps and personal training. We are a small family owned yoga studio located in Westfield Cleveland, Ohio.`,
            isRead: false,
            isStarred: true,
            isTrash: false,
            sentAt: 1651418169,
            to: 'puki@lala.com',
            fullName: 'Ohio Yoga Studio'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Group or personal training? Look no further!',
            body: `We believe that everyone should feel good in their body, and we offer a wide range of programs to suit everyone. We are a boutique fitness studio that offers a variety of group fitness classes, private sessions, boot camps and personal training. Our classes are fun, energetic, and we offer a variety of equipment to suit your needs.
        
            Everyone should feel good in their body, and we offer a wide range of programs to suit everyone. We are a boutique fitness studio that offers a variety of group fitness classes, private sessions, boot camps and personal training. Our classes are fun, energetic, and we offer a variety of equipment to suit your needs.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651418273,
            to: 'muki@lala.com',
            fullName: 'GYM BROS'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Application for 3D development',
            body: `I am a professional 3D designer, 3D animator and an architectural technologist. I have worked with a variety of clients and I am very experienced in the areas of architectural design, interior design, 3D modeling, 3D rendering and modeling, architectural and industrial visualization. I have worked with the architectural technologist of the construction company and the architect of the city. I am passionate about architecture and architecture design.
            
            I have completed projects in a variety of areas, from graphic design, branding, typography, website design, and web development. I have great skills in design and I can adapt to any style needed. I'm looking for some opportunities that can take me into the next level in my career.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651418366,
            to: 'muki@lala.com',
            fullName: 'Markus Larkus'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Schola free concert grand opening',
            body: `For the past six years, the Schola has performed at the Royal Opera House, at the London Palladium, in the British Library, and at the Royal Albert Hall.
            The Schola is a member of the British Society for the Music of the Dramatic Arts (BSMA). The Schola was founded in 1992 and plays many of the same repertoire as the Schola Brass and has its own orchestra. There is also an orchestra from the Schola Brass that performs in the summer months. The Schola is a member of the BSO’s British Society for the Musical Arts (BSMSA).
            The Concert is a programme of concerts and shows, usually in the style of a boys’ choir, performed by a variety of different choirs. It is a chance to hear some of the best music in the world, sung by people of all ages. The Concerts are a way to get to know and get to know one of London’s most vibrant choirs.`,
            isRead: false,
            isStarred: true,
            isTrash: false,
            sentAt: 1651418436,
            to: 'puki@lala.com',
            fullName: 'The Schola orchestra'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'New era of games upon us? Learn about gacha games!',
            body: 'The games are typically a game for mobile devices, web browsers, and the Web as a whole. The process takes weeks, but in the case of a mobile game, it can take as little as two weeks to produce a game that will perform at the level required by the platform. The game is often designed and developed by the developer, usually at a professional level. This type of game development is used in the gaming market as it provides the developer with an income, the developers and their employees are employed on location, and there is no overhead. It can also take the developer longer to develop and publish a game as it is often a collaborative process with the game developers, the publisher and others.',
            isRead: false,
            isStarred: false,
            isTrash: true,
            sentAt: 1651418504,
            to: 'puki@lala.com',
            fullName: 'InfoTech'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Presenting the New Brand HoYoverse',
            body: `Today, we are excited to announce the official launch of our all-new, forward-thinking brand, HoYoverse. The brand aims to create and deliver an immersive virtual world experience to players worldwide through a variety of entertainment services.
        
            Since day one, our primary goal in content creation has been to provide our players all over the globe with something extraordinary, fresh, and intriguing. Our game titles — including Genshin Impact, Honkai Impact 3rd, and Tears of Themis — have been warmly received by a broad spectrum of players in recent years. Meanwhile, we have also introduced a wide range of entertainment content to fans worldwide, expanding our range of game titles and expertise in technical research with the release of the virtual character Lumi and the N0va Desktop App, anime, manga, light novels, and music, among others. The launch of HoYoverse reflects our growing commitment to providing global audiences with immersive entertainment through high-quality, diverse content.
            
            "Our mission in establishing HoYoverse is to create a vast and content-driven virtual world that integrates games, anime, and other diverse types of entertainment, which will provide players with a high level of freedom and immersion," said Haoyu Cai, co-founder and CEO of HoYoverse. "We will continue to focus on long-term operation strategies, consistent technical research, and innovation in a variety of fields, including artificial intelligence, cloud computing, and pipeline construction, to ensure that sufficient content is created to meet the expectations of players worldwide for a virtual world experience."
            
            HoYoverse will expand its content production, technology research, and publishing duties through operations in offices in Montreal, Los Angeles, Singapore, Tokyo, and Seoul. With global talent and employees located around the world, HoYoverse will continue to research and develop cutting-edge technologies to enhance its capacities and capabilities to provide high-quality content that enhances and optimizes the player experience.`,
            isRead: false,
            isStarred: true,
            isTrash: false,
            sentAt: 1651418855,
            to: 'puki@lala.com',
            fullName: 'HoYoverse'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Honkai: Star Rail Second Closed Beta Sign-Up Now Open!',
            body: `In the vast universe, countless planets light up the sky, outlining the legends of the Aeons.
        
            Now, the dim silver tracks are gleaming once again, and the silent Astral Express will sound its long whistle once more.
            
            All-new characters, maps, gameplays... Intensely, but excitedly look forward to seeing the Trailblazers yet again.
            
            The Crew warmly invites you to sign up for the Second Closed Beta and explore the infinite possibilities of the vast galaxy together.
            
            "Dear Trailblazers, the Astral Express is about to depart. Hurry up and get on board."
            
            May this journey lead us starward
            
            https://webstatic.hoyoverse.com/upload/op-public/2022/04/27/6c0a4fc3e81494550459b4bbf5cbfb57_6332410921445452073.png
        
        
            
            ■ About the Second Closed Beta
            
            This is the Second Closed Beta for Honkai: Star Rail. This closed beta test will have a limited number of participants, is free of charge, and any game account progress will be deleted after the beta. We can only grant a limited number of Trailblazers access, thank you for your understanding.
            
            The game is still in development. As such, content of the beta test does not represent the final quality of the product.
            
        
        
            ■ Sign-Up Period
            
            Start date: 2022/04/28 12:00 (UTC+8)
            
            End date: 2022/05/15 12:00 (UTC+8)
            
        
        
            ■ How to Sign Up
            
            Enter the link below to go to the official website. Log in to your HoYoverse Account, and click the "Enter Sign-Up" button to fill in the survey to register for the beta test. The Express Crew will draw from Trailblazers who have successfully submitted the survey to issue test access.
            
            >> Official Sign-Up Page <<
            
            ※ Please be sure to fill in the survey information accurately. If the information provided is false or inaccurate, you may not be able to participate in the beta test.
            
        
        
            ■ Beta Access Notification
            
            After the Second Closed Beta sign-up closes, the Express Crew will notify the Trailblazers who have successfully obtained the Second Closed Beta access by email. Please be sure to provide the correct email address in the sign-up survey.
            
        
        
            ■ Second Closed Beta Device Requirements
            
            This beta test supports PC, Android, and iOS platforms. To ensure a smooth testing experience for all Trailblazers, we recommend that you use the listed devices.
            
            ◆ PC
            
            Recommended specifications: Intel® Core™ i5 Processor, 8 GB of RAM, discrete graphics card, Nvidia GeForce GTX 970, or better.
            
            ◆ Android
            
            Snapdragon 865, Kirin 9000, or better.
            
            ◆ iOS
            
            iPhone: iPhone X, iPhone 8 Plus, or better.
            
            iPad: iPad with Apple A12 processor or better (October 2018 model or later).
            
            ※ Must be iOS 12 or higher. macOS is currently not supported.
            
        
        
            ■ Attention
            
            1. All beta content is still in development and does not represent the final quality of the game.
            
            2. The beta test access will be bound to the device you use to log in for the first time. During the test, one account can only be bound to one device per platform, and other devices cannot be used for the same platform. If you switch devices for a platform during the test period, your game account will be banned and will not be unblocked during the beta. Trailblazers should also pay attention to not trust any information regarding beta account sharing, selling, etc. to avoid unnecessary losses.
            
            3. The beta access is only valid for the current round of testing and cannot be transferred. It is strictly prohibited to transfer or sell beta clients, beta accounts, or other beta-related materials to other people. Access for the beta will be revoked for accounts found to have conducted such activities.
            
            4. This round of testing is a small-scale, limited, full-wipe beta. The test servers will not have any top-up available.
            
            5. If you are a child as specified by relevant personal data protection policies in your country or region, you must obtain permission from your guardian before participating in this survey.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651418989,
            to: 'muki@lala.com',
            fullName: 'HoYoverse'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Genshin Impact\'s Version 2.6 Arrives',
            body: `Global interactive entertainment brand HoYoverse has announced that Genshin Impact's Version 2.6 update, "Zephyr of the Violet Garden," will be arriving on March 30, 2022. A brand-new area, The Chasm that is located at the westernmost of Liyue, will soon open and along with it, the story threads of the Traveler Twins and Khaenri'ah will finally be uncovered. Meanwhile, players can also visit Inazuma on the other side of the sea, meet the newest five-star character Kamisato Ayato, and celebrate the Magnificent Irodori Festival with talents and friends across Teyvat.
        
            https://webstatic.hoyoverse.com/upload/op-public/2022/03/29/6a67484d4bd71dd1932f2546dc4bc783_3845142967967739845.png
            
        
            Genshin Impact is a free-to-play open-world action RPG that brings players to the visually stunning world of Teyvat. The player takes on the role of the mysterious "Traveler," who sets off on a journey to discover the fate of their lost sibling and unveils the mysterious secrets of Teyvat along the way. Currently, players can explore Mondstadt, Liyue Harbor, and Inazuma, three of the seven major cities in Teyvat, each with unique cultures, stories, and vast regions, and offering a diversity of creatures, monsters, secrets, and hidden treasures for players to discover. Further cities, stories, characters, and seasonal events will be released as the game progresses!
            
            As Liyue's primary source of ores, The Chasm consists of a distinct violet-red area with an unfathomably deep space underground. The area has been closed due to a series of mysterious accidents and is now overrun by monsters, Treasure Hoarders, and the Fatui. The new boss enemy Ruin Serpent and unknown danger from the Abyss also await at the end of The Chasm, where the main story continues with the new Archon Quest "Requiem of the Echoing Depths" in the company of Dainsleif. Meanwhile, a gadget named the Lumenstone Adjuvant will be handed to players to help illuminate pathways. Travelers can also unlock bountiful rewards including a four-star Weapon Billet and an all-new Namecard.
            
            After the Sakoku Decree was abolished, Inazuma and the Magnificent Irodori Festival are now welcoming talents and guests all across Teyvat. Organized by the Yashiro Commission and Yae Miko, this year's Irodori Festival will invite Venti, Xingqiu, and many old acquaintances to celebrate a time of arts and culture. In the meantime, rich rewards always come with festivities and games, ranging from taking themed photographs for a Mondstadt bard, clearing stages in the upgraded Theater Mechanicus, dueling in sword fighting, or practicing the art of flower arrangement. With all challenges accomplished, players can unlock a chance to recruit the four-star playable character Xingqiu.
            
            Kamisato Ayato will make his debut as the newest five-star character during Version 2.6. As the young but highly accomplished head of the Yashiro Commission's Kamisato Clan, Ayato is a man of many ways and means. In his Story Quest, players will see how Ayato handles troubles and an unusual occasion as Inazuma steps into a new era of progress. In terms of combat, Ayato wields a sword and holds the Hydro Vision. He can unleash immense Hydro damage in a short amount of time, and is capable of increasing the effects of his party's Normal Attacks.
            
            Players may recruit Kamisato Ayato and Venti in their Character Event Wishes, followed by the first rerun of Kamisato Ayaka in the latter half of the update. The Weapon Event Wish will feature a new five-star sword from Inazuma called "Haran Geppaku Futsu," among others.
            
            Genshin Impact's Version 2.6 update will be arriving on March 30, 2022. With the cross-save function, players can now continue their adventure across PlayStation®, PC, and mobile. For more information and updates, please visit the official Genshin Impact website (genshin.hoyoverse.com) or follow @GenshinImpact on Twitter, Instagram, and Facebook.
            
            Check out the Version 2.6 "Zephyr of the Violet Garden" trailer here: https://youtu.be/LqCwQicfMuc `,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651419073,
            to: 'puki@lala.com',
            fullName: 'HoYoverse'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: ' Earth Defense Force 6 launches August 25 in Japan ',
            body: `Alien third-person shooter Earth Defense Force 6 will launch both physically and digitally for PlayStation 5 and PlayStation 4 on August 25 in Japan for 8,980 yen, publisher D3 Publisher and developer Sandlot announced.
        
            A digital Deluxe Edition will also be available for 12,100 yen, which includes the game, Season Pass, and a number of other bonuses.
            
            PlayStation Store pre-orders will begin on April 30 at a 7,633 yen discount price for the standard edition, and 10,285 yen for the Deluxe Edition. Pre-orders include the Wing Diver support equipment “Reverse Core N-Type.”
            
            Users who purchase the PlayStation 4 version will be able to upgrade to the PlayStation 5 version, and both versions support up to four players cross-platform multiplayer. The PlayStation 5 version will be playable at 4K resolution.
            
            First-print copies of the game will include decoys of Hololive Virtual YouTubers Ookami Mio, Shirakami Fubuki, and Nakiri Ayame. A decoy is a balloon that acts as a decoy to draw the enemy’s attention.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651419277,
            to: 'puki@lala.com',
            fullName: 'Gematsu news'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Persona Super Live P-Sound Wish 2022',
            body: `ATLUS will host Persona series concert “Persona Super Live P-Sound Wish 2022 ~Crossing Journey~” from October 8 to 9 at Makuhari Messe in Chiba, Japan, the company announced.
        
            The first day of the event will feature performances by Lyn Inaizumi, Yumi Kawamura, Lotus Juice, Shoji Meguro, while the second day will feature performances by Lyn Inaizumi, Shihoko Hirata, Shoji Meguro, Lotus Juice.
            
            The event will be live streamed worldwide for users not able to attend in person. Venue tickets will go on sale here on April 29, while live stream tickets will follow on May 1.
            
            Previous Persona Super Live concerts have been the venue for major Persona announcements. The 2017 event featured Persona 5: Dancing in Starlight, Persona 3: Dancing in Moonlight, and Persona Q2: New Cinema Labyrinth; the 2019 event featured Persona 5 Royal.
            
            Visit the official website here. https://p-ch.jp/p-wish2022/
            
            The news was announced as part of the fourth volume of ATLUS’ Persona 25th anniversary news video series, Persona 25th Times.
            
            Watch the announcement trailer for Persona Super Live P-Sound Wish 2022 ~Crossing Journey~ and the full Persona 25th Times Vol. 4 below.
            
            https://www.youtube.com/watch?v=q4X741A2WCw`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651419356,
            to: 'puki@lala.com',
            fullName: 'Gematsu news'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Final Fantasy XVI development in “the final stretch”',
            body: `Development on Final Fantasy XVI is in “the final stretch,” producer Naoki Yoshida said in the latest issue of Uniqlo’s free in-store UT magazine, which includes an interview with Yoshida as part of the clothing company’s collaboration with Final Fantasy for the franchise’s 35th anniversary.
        
            “Currently, development on the latest title, Final Fantasy XVI, is in the final stretch,” Yoshida said. “As a single-player game, Final Fantasy XVI aims to unify the story and gameplay experience. Unlike online games, which portrays multiple players at once, Final Fantasy XVI has an individual focus, which makes the story more immersive. And I think the story has become quite deep. My hope is that the adults who have grown up, understand the rules of society, and drifted away from Final Fantasy thinking ‘the real world isn’t as easy as a video game’ can remember the enthusiasm they had back then. That’s what we’re keeping in mind as we make this game.”
            
            Final Fantasy XVI is in development for PlayStation 5. More information is planned to be announced this spring.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651419414,
            to: 'puki@lala.com',
            fullName: 'Gematsu news'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: ' Super Mario Bros. animated film delayed to April 7, 2023 ',
            body: `
        
            Illumination and Nintendo have delayed the Super Mario Bros. animated film from its previously planned holiday 2022 release window to April 7, 2023 in North America and April 28 in Japan.
            
            In a message posted on Nintendo of America’s official Twitter account, Mario creator Shigeru Miyamoto said, “This is Miyamoto. After consulting with Chris-san, my partner at Illumination on the Super Mario Bros. film, we decided to move the global release to Spring 2023–April 28 in Japan and April 7 in North America. My deepest apologies but I promise it will be well worth the wait.”
            `,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651419510,
            to: 'puki@lala.com',
            fullName: 'Gematsu news'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'Exclusive Interview – Composer Robert Wolf on his G.A.N.G.',
            body: `Last month the 20th Annual G.A.N.G. Awards nominees were announced with Call of Duty: Vanguard and League of Legends leading the nominations. Another game recognized was Hypergryph’s Arknights for “Best Original Song- Immutable”. One of the creatives involved in bringing that song to life is composer and multi-instrumentalist Robert Wolf. Robert is part of the team at Hexany Audio, a Los Angeles-based audio company specializing in original music and sound for games, VR and interactive media. Some of Robert’s other credits include Call of Duty: Mobile and Honor of Kings. We wanted to pull back the curtain on how a song like Immutable was made, so we spoke to Robert exclusively below.
        
        
        
            
            What did preproduction look like for you on Immutable?
            
            Before I started composing the song, I studied Hypergryph’s design document and talked to our lead composer Matthew Carl Earl about what his thoughts were on the direction of the track. At this stage we already agreed to hire Melissa Kaplan, as the vocalist and lyricist.
        
        
            
            How did you decide on the vibe/sound of the song? What sort of direction did Hypergryph give you?
            
            Conceptualizing the music for the character Kal’tsit was an exciting challenge. In their design document, the client was asking for an “ambient, hybrid-electronic” musical style with a mysterious, secretive tone. I was tasked to convey the character’s backstory through the music and lyrics of the song. Kal’tsit is thousands of years old and has lived many different lives; she is calm and rational but also strict and severe, so the song had to combine a sense of scale and wisdom with the intensity of her backstory and her readiness to embark on dangerous missions. From the start, I wanted to use soft ambient synth environments with a lot of reverb and pair these with an interesting but subtle beat.
            
        
        
            If you had to describe the track in a few words, what would they be?
            
            In short, ambient vastness and lyrical intimacy.
            
        
        
            You have worked on Arknights before. Can you talk about your previous work on the game and how your experience with Immutable was different?
            
            Working on Arknights is always a very fun challenge since you never know what musical style you will be asked to write in. I had written several tracks for Arknights before writing “Immutable.” I learned a lot of valuable techniques from writing “Reconnection,” an ambient synth track that allowed me to explore an interesting mix between acoustic elements and synthesizer soundscapes and improved my workflow with analogue synths. When I wrote the vocal line for “Immutable,” I tried to be flexible and leave room for Melissa to make the song her own, add her own touch to the melody. It was amazing to hear how she interpreted the melody and to see the song slowly develop into its final form throughout this collaboration process. This approach was different to how I normally work, since I normally produce every aspect of a piece myself.
            
        
        
            The song is for a character that is a scientist and a healer. How exactly did you give those elements a musical voice?
            
            I used a lot of soft synthesizer tones, giving them a lot of reverb in order to highlight her gentle, caring nature, and I also left some sections pretty open, atmospheric, without vocals, just to establish a mood. I paired that with mechanical sound effects that I worked into the beat, so you can hear small gears and air noises and such, which I thought could represent her focused, professional, and scientific side. I avoided making the song too intense—even the chorus stays soft and ambient overall, and the beat is relatively subdued, which I thought would allow the vocals to shine.
            
        
            
            Congrats on your Game Audio Network Guild nomination for the song. Why do you think this song resonated so well with voters?
            
            Thank you so much! Yes, I really enjoyed seeing how well this track was received by the Arknights community and how much it means to many fans. Having it recognized by the Game Audio Network Guild has been just amazing! I hope voters hear how much thought went into the writing and production of this song, but ultimately, I am just happy that this piece of music found an audience that appreciates it and keeps listening.
            
        
        
            Melissa Kaplan did the vocals on the track. Why did you pick her for this song?
            
            Melissa is a super talented vocalist who has so much experience working on huge games, like the Assassin’s Creed series and recently Horizon Forbidden West. I knew that she would have the perfect vocal range and style for this track. Apart from being an experienced vocalist, she is also able to write really beautiful lyrics, which made it obvious that she would be the right fit for telling Kal’tisit’s story. I had an amazing time working with Melissa, and I think she gave the track a very unique tone.
            
        
        
            What would be your dream video game to make music for?
            
            This is a difficult question. I play a lot of games, and there are many titles that I would love to contribute to. But, I think writing music for a game based one either The Witcher franchise or Star Wars would be an absolute dream.
            
        
        
            What are you working on next?
            
            At our studio Hexany Audio, we’re actually working on the music and sound design for a pretty wide variety of games. While I’m focused on music, Kellen Fenton runs our sound team and Richard Ludlow oversees both our music and sound teams. Some of our recent work includes audio for titles like League of Legends from Riot Games, PUBG Mobile from Tencent, New World from Amazon, and Splitgate from 1047 Games. Personally, I’m currently working on another upcoming Arknights track, but also write music for several other titles, some of which are still unreleased. You can also check out our site at https://hexanyaudio.com to keep an eye on all of our latest work.
            
            The annual award show will take place digitally on May 25th via Twitch. You can listen to Immutable here: https://www.youtube.com/watch?v=bZqOYWozoMs`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651419767,
            to: 'puki@lala.com',
            fullName: 'flickeringmyth'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: '2022 Square Enix Golden Week sale live on the Switch eShop',
            body: `Square Enix has kicked off a 2022 Golden Week sale on the Switch eShop with some big discounts – fans can save up to 70 percent. Games like Actraiser Renaissance, Dungeon Encounters, Lost Sphear, and Oninaki are at their lowest prices ever.
        
            The full lineup of deals is as follows:
            
            – Actraiser Renaissance – $20.99 (was $29.99)
            – Balan Wonderworld – $11.99 (was $39.99)
            – Chocobo’s Mystery Dungeon Every Buddy! – $15.99 (was $39.99)
            – Collection of Mana – $19.99 (was $39.99)
            – Collection of SaGa Final Fantasy Legend – $13.99 (was $19.99)
            – Dragon Quest – $3.24 (was $4.99)
            – Dragon Quest II – $4.21 (was $6.49)
            – Dragon Quest III – $8.11 (was $12.49)
            – Dungeon Encounters – $19.49 (was $29.99)
            – Final Fantasy Crystal Chronicles Remastered Edition – $11.99 (was $29.99)
            – Final Fantasy IX – $10.49 (was $20.99)
            – Final Fantasy VII – $7.99 (was $15.99)
            – Final Fantasy VIII Remastered – $9.99 (was $19.99)
            – Final Fantasy X/X-2 HD Remaster – $24.99 (was $49.99)
            – Final Fantasy XII: The Zodiac Age – $24.99 (was $49.99)
            – Final Fantasy XV Pocket Edition HD – $11.99 (was $29.99)
            – I Am Setsuna – $15.99 (was $39.99)
            – Legend of Mana – $20.99 (was $29.99)
            – Lost Sphear – $14.99 (was $49.99)
            – NEO: The World Ends with You – $29.99 (was $59.99)
            – Oninaki – $19.99 (was $49.99)
            – Romancing SaGa 2 – $7.49 (was $24.99)
            – Romancing SaGa 3 – $8.69 (was $28.99)
            – SaGa Frontier Remastered – $17.49 (was $24.99)
            – SaGa Scarlet Grace: Ambitions – $8.99 (was $29.99)
            – Spelunker Party! – $14.99 (was $29.99)
            – Star Ocean: First Departure R – $8.39 (was $20.99)
            – Trials of Mana – $24.99 (was $49.99)
            – Voice of Cards: The Forsaken Maiden – $23.99 (was $29.99)
            – World of Final Fantasy Maxima – $15.99 (was $39.99)
            
            Square Enix will be hosting its 2022 Golden Week Switch eShop sale until May 11 at 11:59 PM PT / May 12 at 2:59 AM ET.`,
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651419897,
            to: 'puki@lala.com',
            fullName: 'nintendoeverything.com'
        },
        
        {
            id: `m${utilService.makeId()}`,
            subject: 'About HoYoverse',
            body: 'At HoYoverse, we are committed to creating immersive virtual world experiences for players around the world. In addition to game products such as Genshin Impact, Honkai Impact 3rd, Tears of Themis, and Honkai: Star Rail, HoYoverse also launched the dynamic desktop software N0va Desktop, the community product HoYoLAB, and created a variety of products such as animations, comics, music, novels, and merchandise around our original creative concept. Adhering to our mission of Tech Otakus Save the World, we have always been committed to technology research and development, exploring cutting-edge technologies, and have accumulated leading technical capabilities in cartoon rendering, artificial intelligence, cloud gaming technology, and other fields. HoYoverse is actively engaged in globalization, with offices in Singapore, Montreal, Los Angeles, Tokyo, Seoul, and other areas.',
            isRead: false,
            isStarred: false,
            isTrash: false,
            sentAt: 1651420147,
            to: 'puki@lala.com',
            fullName: 'HoYoverse'
        }
        

    ]
}