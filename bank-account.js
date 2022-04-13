export class BankAccount {
 
  constructor() {
    this.currentBalance = 0;
    this.status = false;
  }

  open() {
    if(this.status) throw new ValueError;
    this.status = true;
  }

  checkAccountIsClosed(){
    if(!this.status) throw new ValueError;
  }

  close() {
    this.checkAccountIsClosed();
    this.currentBalance = 0;
    this.status = false;
  }

  withDeposit(deposit) {
    if(this.checkAccountIsClosed() || deposit < 0) throw new ValueError;
    this.currentBalance += deposit;
  }

  withdraw(draw) {
    if(this.checkAccountIsClosed() || draw > this.currentBalance || draw < 0) throw new ValueError;
    this.currentBalance -= draw;
  }

  get balance() {
    this.checkAccountIsClosed();
    return this.currentBalance;
  }
}

export class ValueError extends Error {
  constructor() {
    super('Bank account error');
  }
}
