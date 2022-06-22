import { Injectable } from "@nestjs/common";
import fs from "fs";
const BlockIo = require('block_io');

@Injectable()
export class CryptoApiService {
  private readonly block_io;

  constructor() {
    this.block_io = new BlockIo({
      api_key: process.env.BLOCK_IO_API_KEY,
      pin: process.env.BLOCK_IO_PIN
    })
  }

  async getNewAdress() {
    return new Promise((resolve, reject) => {
      this.block_io.get_new_address().then(data => {
        resolve(data.data.address)
      }).catch(e => reject(e))
    })
  }

  async getAdressBalance(address) {
    return new Promise((resolve, reject) => {
      this.block_io.get_address_balance({address: address}).then(data => {
        //console.log(data)
        if (data.status == "success") {
          resolve(data.data.balances[0].available_balance)
        } else {
          reject("Ошибка сервера block.io")
        }
      }).catch(e => reject(e))
    })
  }

  async getAdressTransaction(address): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.block_io.get_transactions({ type: 'received', addresses: address}).then((data) => {

        const transaction = data.data.txs
        resolve(transaction)

      }).catch(e => reject(e))
    })
  }
}