import { AxiosInstance } from "axios"
import { RemoteService } from "../types"

export class HttpService implements RemoteService {
  private axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.axios = axios
  }

  get = async <T>(url: string): Promise<T> => (await this.axios.get(url)).data
}
