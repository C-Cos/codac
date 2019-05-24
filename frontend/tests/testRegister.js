import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000/`;

test('Register no name', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        //.typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'azerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register no email', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        //.typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'azerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register no zpicode', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        //.typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'azerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register no password', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        //.typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'azerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register no confPass', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        //.typeText("#confPassRegister", 'azerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register no confPass', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        //.typeText("#confPassRegister", 'azerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register confPass different from password', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'azerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register wrong email format', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register wrong username format >5', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Cap', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register wrong username format <20', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'CapitaineNemonautilusdelamort', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register wrong postcode format', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register wrong postcode format', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '9213498', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register wrong postcode format', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", 'rt567', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")

});

test('Register user already exists', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Capitaine', { speed: 0.7 })
        .typeText("#emailRegister", 'capitaine.nemo@nautilus.com', { speed: 0.7 })
        .typeText("#zipcode", '92120', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")

});