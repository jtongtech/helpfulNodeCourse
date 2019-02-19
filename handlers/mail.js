var nodeMailer = require('nodemailer');
var pug = require('pug');
var juice = require('juice');
var htmlToText = require('html-to-text');
var promisify = require('es6-promisify');

var transport = nodeMailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

// transport.sendMail({
//     from: 'Jeremy <eldertong@gmail.com>',
//     to: 'test@testcom',
//     subject: 'First mail',
//     html: 'Hey <b>YOU</b>',
//     text: 'Hey You!'
// });

var generateHTML = (filename, options = {}) => {
    var html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
    var inlined = juice(html);
    return inlined;

}

exports.send = async (options) => {
    var html = generateHTML(options.filename, options);
    var text = htmlToText.fromString(html);
    var mailOptions = {
        from: `Jeremy Tong <eldertong@gmail.com>`,
        to: options.user.email,
        subject: options.subject,
        html: html,
        text: text
    };
    var sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
};