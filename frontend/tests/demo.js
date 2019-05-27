import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000/`;

test('Register', async t => {
    await t
        .setNativeDialogHandler(() => true)
        /* .click('#register')
        .click('#asso')
        .typeText("#nameRegister", 'Minnie', { speed: 0.7 })
        .typeText("#emailRegister", 'minnie@disney.com', { speed: 0.7 })
        .typeText("#zipcode", '78560', { speed: 0.7 })
        .typeText("#passwordRegister", 'qwerty', { speed: 0.7 })
        .typeText("#confPassRegister", 'qwerty', { speed: 0.7 })
        .click("#SubmitRegister")
        .typeText("#logemail", 'minnie@disney.com', { speed: 0.5 })
        .typeText("#logpassword", 'qwerty', { speed: 0.5 })
        .click('#logsubmit') */
        .pressKey("pagedown pagedown pagedown pagedown pagedown pagedown pagedown")
        .pressKey("pageup pageup pageup pageup pageup pageup pageup")
        .click('#carouselRight')
        .click('#carouselRight')
        .click('#carouselRight')
        .click("#carouselLeft")
        .click("#carouselLeft")
        .click("#carouselLeft")

});