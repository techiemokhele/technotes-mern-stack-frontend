import emailjs from 'emailjs-com'

export const sendEmail = (templateParams) => {
    return emailjs.send(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_USER_ID
    )
}
