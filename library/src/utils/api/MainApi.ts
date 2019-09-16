import axios from 'axios'

interface IPayloadBody {
  query: any
  variables?: any
}

class MainApi {
  _getHeaders() {
    return {
      'Content-Type': 'application/json'
    }
  }

  async post(url: string, payloadBody: IPayloadBody) {
    const headers = this._getHeaders()

    try {
      const response = await axios({
        method: 'post',
        url,
        data: payloadBody,
        headers
      })

      return response
    } catch (e) {
      throw Error(e)
    }
  }
}

export default new MainApi()
