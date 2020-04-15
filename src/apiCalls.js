export const sendSMS = (to, from, body) => {
  return fetch(`https://hangry-ateball-staging.herokuapp.com/api/v1/notify?to=${to}&from=${from}&body=${body}`)
}