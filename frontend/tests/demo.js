import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000/`;

test('Register', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Peter Parker', { speed: 0.7 })
        .typeText("#emailRegister", 'peter.parker@spiderman.com', { speed: 0.7 })
        .typeText("#zipcode", '78560', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")
        .typeText("#logemail", 'peter.parker@spiderman.com', { speed: 0.5 })
        .typeText("#logpassword", 'qwerty', { speed: 0.5 })
        .click('#logsubmit')
});