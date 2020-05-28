import { Injectable } from '@angular/core';
import { BlockChain } from 'Savjeecoin/src/blockchain';
import EC from 'elliptic';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public BlockchainInstance = new BlockChain();
  public walletKeys = [];
  constructor() {
    this.BlockchainInstance.difficulty = 1;
    this.BlockchainInstance.minePendingTransactions('my-wallet-address');
    this.generateWalletKeys();
  }
  getBlocks(){
    return this.BlockchainInstance.chain;
  }
  private generateWalletKeys(){
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.publicKey('hex'),
      privateKey: key.private('hex'),
    });
  }
}
