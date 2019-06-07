import { Selector } from 'testcafe';

/////*** IMPORTANT, NE PAS OUBLIER DE CREER L'UTILISATEUR POUR QUE LE LOGIN FONCTIONNE ***/////

fixture `Getting Started`
    .page `http://localhost:3000/`;

    const LoginButton  = Selector('.nav-link').withText('Login');
    const CreateEventMenu  = Selector('.dropdown-item').withText('Créer un évènement');

test('Test Add Event', async t => {
    await t
    .click(LoginButton)
    .typeText("#logemail", 'rafael.nadal@tennis.com', { speed: 0.5 })
    .typeText("#logpassword", 'kikoo', { speed: 0.5 })
    .click('#logsubmit')  
    .click('.dropdown-toggle')
    .click(CreateEventMenu)
    // .typeText("#nameEvent", 'Finale de Roland Garros', { speed: 0.5 })
    // .typeText("#descEvent", "Nadal-Djokovic comme d'habitude", { speed: 0.5 })
    // .typeText(".adresse", "61 avenue de la Porte d'Auteuil", { speed: 0.5 })
    // .typeText(".code", "75016", { speed: 0.5 })
    .typeText(".datedebut", "2019-06-09", { speed: 0.5 })
    .typeText(".heuredebut", "15:00", { speed: 0.5 })



    // .click("#emailEdit")
    // .pressKey('backspace backspace backspace')
    // .typeText("#emailEdit", 'ch', { speed: 0.5 })
    // .click("#zipcode")
    // .pressKey('backspace backspace backspace backspace backspace')
    // .typeText("#zipcode", '74000', { speed: 0.5 })
    //.click('#SubmitEdit')
    //.wait(5000)
});

