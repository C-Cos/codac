import { Selector } from 'testcafe';

/////*** IMPORTANT, NE PAS OUBLIER DE CREER L'UTILISATEUR POUR QUE LE LOGIN FONCTIONNE ***/////

fixture `Getting Started`
    .page `http://localhost:3000/`;

    const LoginButton  = Selector('.nav-link').withText('Login');
    const UserMenu  = Selector('.dropdown-item').withText('Profil Utilisateur');

test('Test Edit User Profile', async t => {
    await t
    .click(LoginButton)
    .typeText("#logemail", 'roger.federer@tennis.com', { speed: 0.5 })
    .typeText("#logpassword", 'kikoo', { speed: 0.5 })
    .click('#logsubmit')  
    .click('.dropdown-toggle')
    .click(UserMenu)
    .click('.btn-secondary')
    .typeText("#nameEdit", ' Federer', { speed: 0.5 })
    .click("#emailEdit")
    .pressKey('backspace backspace backspace')
    .typeText("#emailEdit", 'ch', { speed: 0.5 })
    .click("#zipcode")
    .pressKey('backspace backspace backspace backspace backspace')
    .typeText("#zipcode", '74000', { speed: 0.5 })
    //.click('#SubmitEdit')
    //.wait(5000)
});

