import { HttpException, Injectable, Logger } from "@nestjs/common";
import { HttpMethodsEnum } from "../../enums/http-methods.enum";


const request = require('request')

@Injectable()
export class QiwiApiService {
  private readonly apiKey: string
  private readonly apiHost: string
  private readonly adminQiwi: string

  constructor() {
    this.apiKey = process.env.QIWI_API_KEY
    this.apiHost = process.env.QIWI_API_HOST
    this.adminQiwi = process.env.QIWI_ADMIN_PHONE
  }

  async test(){
    return this.getDepositByCommentAndSum("CBA", 5)
  }

  //#region Information
  async getRubBalance(): Promise<number> {
    let data = await this.doRequest(HttpMethodsEnum.GET,`/funding-sources/v2/persons/${this.adminQiwi}/accounts`).catch(e => {
      throw new HttpException(e, 500)
    })

    return parseInt(data.accounts.find((elem) => {return elem.alias = "qw_wallet_rub"}).balance.amount) | 0
  }

  async getCardProvider(cardNumber) {
    return new Promise((resolve, reject) => {
      var options = {
        'method': 'POST',
        'url': 'https://qiwi.com/card/detect.action',
        'headers': {
          'Accept': 'application/json',
          'Content-type': 'application/x-www-form-urlencoded',
        },
        form: {
          'cardNumber': `${cardNumber}`
        }
      };
      request(options, function (error, response) {
        const result = JSON.parse(response.body)
        if (error || result.code.value == 2) reject("Неправильно введён номер карты")
        else resolve(result.message)
      });
    })
  }

  async getDepositByCommentAndSum(comment, sum) {
    let payments = await this.doRequest(HttpMethodsEnum.GET, `/payment-history/v2/persons/${this.adminQiwi}/payments?operation=IN&sources=QW_RUB&rows=50`).catch(e => {
      throw new HttpException(e, 500)
    })

    return payments.data.find((elem) => {
      return elem.sum.amount == sum && elem.comment == comment
    })

  }

  async getDepositByComment(comment) {
    let payments = await this.doRequest(HttpMethodsEnum.GET, `/payment-history/v2/persons/${this.adminQiwi}/payments?operation=IN&sources=QW_RUB&rows=50`).catch(e => {
      throw new HttpException(e, 500)
    })

    return payments.data.find((elem) => {
      return elem.comment == comment
    })
  }
  //#endregion

  //#region create payments
  async sendMoneyToQiwiWallet(phone, sum) {
    const body = this.createPaymentsObj(phone, sum)

    return await this.doRequest(HttpMethodsEnum.POST, `/sinap/api/v2/terms/99/payments`, body).catch(e => {
      throw new HttpException(e, 500)
    })
  }

  async sendMoneyToCard(cardNumber, sum) {
    const cardProvider = await this.getCardProvider(cardNumber).catch(e => {
      throw new HttpException(e, 500)
    })

    const body = this.createPaymentsObj(cardNumber, sum)
    return await this.doRequest(HttpMethodsEnum.POST, `/sinap/api/v2/terms/${cardProvider}/payments`, body).catch(e => {
      throw new HttpException(e, 500)
    })
  }

  private createPaymentsObj(account, sum) {
    return {
      id: (1000 * new Date().getTime()).toString(),
      sum: {
        amount: sum,
        currency: "643"
      },
      paymentMethod: {
        type: "Account",
        accountId: "643"
      },
      fields: {
        account: account.toString()
      }
    }
  }
  //#endregion

  private doRequest(method, url, resBody?): Array<any> | any {
    return new Promise((resolve, reject) => {

      const options = {
          'method': `${method}`,
          'url': `${this.apiHost}${url}`,
          'headers': {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resBody)
      }

      request(options,
        (err, response, body) => {
          if (err || response.statusCode == 401) reject("Ошибка с серверами QIWI")
          else {
            resolve(JSON.parse(body))
          }
        }
      )
    })
  }

}
