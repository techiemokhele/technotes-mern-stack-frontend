export const USER_REGEX = /^[A-z]{3,20}$/
export const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

export const DASH_REGEX = /^\/dash(\/)?$/
export const NOTES_REGEX = /^\/dash\/notes(\/)?$/
export const USERS_REGEX = /^\/dash\/users(\/)?$/

export const CARDNAME_REGEX = /^[a-zA-Z\s]{2,50}$/
export const CARDEXP_REGEX = /^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$/
export const CARDNO_REGEX = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/
export const CARDCVV_REGEX = /^[0-9]{3,4}$/
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const STRADD_REGEX = /^[a-zA-Z0-9\s,'-]{3,100}$/
export const CITY_REGEX = /^[a-zA-Z\s-]{2,50}$/
export const PROVINCE_REGEX = /^[a-zA-Z\s]{2,50}$/
export const CODE_REGEX = /^[0-9]{4,5}$/
export const COUNTRY_REGEX = /^[a-zA-Z\s]{2,56}$/