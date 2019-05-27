import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000/`;

test('Register', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Daft Punk', { speed: 0.7 })
        .typeText("#emailRegister", 'daft.punk@discovery.com', { speed: 0.7 })
        .typeText("#zipcode", '75011', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")
        .typeText("#logemail", 'daft.punk@discovery.com', { speed: 0.5 })
        .typeText("#logpassword", 'qwerty', { speed: 0.5 })
        .click('#logsubmit')
        .click('#carouselRight')
        .click('#carouselRight')
        .click('#carouselRight')
        .click("#carouselLeft")
        .click("#carouselLeft")
        .click("#carouselLeft")

});