const isEmailValid = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const isPhoneNumberValid = /((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/
const isFullNameValid = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;

export {isEmailValid,isFullNameValid,isPasswordValid,isPhoneNumberValid} ;