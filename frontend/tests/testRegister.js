import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000/`;

test('Register', async t => {
    await t
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.5 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.5 })
        .typeText("#zipcode", '92120', { speed: 0.5 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.5 })
        .typeText("#confPassRegister", 'azerty', { speed: 0.5 })
        .click("#SubmitRegister")
});