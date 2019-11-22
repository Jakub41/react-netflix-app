class BasicApi {
  constructor () {
    const username = 'user25'
    const password = 'gX7HF4hYaYyJAzpt'
    this.token = btoa(username + ':' + password)
    this.domain = 'strive-school-testing-apis.herokuapp.com/api'

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
