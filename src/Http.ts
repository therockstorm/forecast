import { AxiosInstance } from "axios"
import { Fetcher } from "./deps"

export class Http implements Fetcher {
  private axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  get = async <T>(url: string): Promise<T> => (await this.axios.get(url)).data
}
