import {API_COMMENTS_URL, API_PASSWORD, API_USERNAME} from './ApisConst'

class BasicApi {
  constructor () {
    this.token = btoa(API_USERNAME + ':' + API_PASSWORD)
    this.domain = API_COMMENTS_URL

    this.protocol = 'https'
    this.credentials = {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Basic ' + this.token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    }
    this.url = `${this.protocol}://${this.domain}`
  }
}

export default BasicApi
