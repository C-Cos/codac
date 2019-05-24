import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://localhost:3000/`;

test('Success case', async t => {
    await t
    .click('#login')
    .typeText("#logemail", 'donald.duck@disney.com', { speed: 0.5 })
    .typeText("#logpassword", 'kikoo', { speed: 0.5 })
    .click('#logsubmit')   
});

test('No email', async t => {
    await t
    .click('#login')
    .typeText("#logpassword", 'kikoo', { speed: 0.5 })
    .click('#logsubmit')    
});

test('No password', async t => {
    await t
    .click('#login')
    .typeText("#logemail", 'donald.duck@disney.com', { speed: 0.5 })
    .click('#logsubmit')   
});
//CHECK IF USER IS NOT IN DB
test('User does not exist', async t => {
    await t
    .click('#login') 
    .typeText("#logemail", 'inconnu.au@bataillon.fr', { speed: 0.5 })
    .typeText("#logpassword", 'nimportequoi', { speed: 0.5 })
    .click('#logsubmit')

});

test('Password does not match', async t => {
    await t
    .click('#login') 
    .typeText("#logemail", 'donald.duck@disney.com', { speed: 0.5 })
    .typeText("#logpassword", 'nimportequoi', { speed: 0.5 })
    .click('#logsubmit')    
});
//WITH BACK SERVER OFF
test('Server error', async t => {
    await t
    .click('#login')
    .typeText("#logemail", 'donald.duck@disney.com', { speed: 0.5 })
    .typeText("#logpassword", 'kikoo', { speed: 0.5 })
    .click('#logsubmit')   
});