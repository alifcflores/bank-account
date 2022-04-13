import { BankAccount, ValueError } from './bank-account';

describe('Bank Account', () => {
  test('newly opened account has zero balance', () => {
    const account = new BankAccount();
    account.open();
    expect(account.balance).toEqual(0);
  });

  test('can deposit money', () => {
    const account = new BankAccount();
    account.open();
    account.withDeposit(100);
    expect(account.balance).toEqual(100);
  });

  test('can deposit money sequentially', () => {
    const account = new BankAccount();
    account.open();
    account.withDeposit(100);
    account.withDeposit(50);
    expect(account.balance).toEqual(150);
  });

  test('can withdraw money', () => {
    const account = new BankAccount();
    account.open();
    account.withDeposit(100);
    account.withdraw(50);
    expect(account.balance).toEqual(50);
  });

  test('can withdraw money sequentially', () => {
    const account = new BankAccount();
    account.open();
    account.withDeposit(100);
    account.withdraw(20);
    account.withdraw(80);
    expect(account.balance).toEqual(0);
  });

  test('checking balance of closed account throws error', () => {
    const account = new BankAccount();
    account.open();
    account.close();
    expect(() => account.balance).toThrow(ValueError);
  });

  test('Deposit into closed account throws error', () => {
    const account = new BankAccount();
    account.open();
    account.close();
    expect(() => {
      account.withDeposit(50);
    }).toThrow(ValueError);
  });

  test('withdraw from closed account throws error', () => {
    const account = new BankAccount();
    account.open();
    account.close();
    expect(() => {
      account.withdraw(50);
    }).toThrow(ValueError);
  });

  test('close already closed account throws error', () => {
    const account = new BankAccount();
    expect(() => {
      account.close();
    }).toThrow(ValueError);
  });

  test('open already opened account throws error', () => {
    const account = new BankAccount();
    account.open();
    expect(() => {
      account.open();
    }).toThrow(ValueError);
  });

  test('reopened account does not retain balance', () => {
    const account = new BankAccount();
    account.open();
    account.withDeposit(50);
    account.close();
    account.open();
    expect(account.balance).toEqual(0);
  });

  test('cannot withdraw more than Deposited', () => {
    const account = new BankAccount();
    account.open();
    account.withDeposit(25);
    expect(() => {
      account.withdraw(50);
    }).toThrow(ValueError);
  });

  test('cannot withdraw negative amount', () => {
    const account = new BankAccount();
    account.open();
    account.withDeposit(100);
    expect(() => {
      account.withdraw(-50);
    }).toThrow(ValueError);
  });

  test('cannot deposit negative amount', () => {
    const account = new BankAccount();
    account.open();
    expect(() => {
      account.withDeposit(-50);
    }).toThrow(ValueError);
  });

  test('changing balance directly throws error', () => {
    const account = new BankAccount();
    account.open();
    expect(() => {
      account.balance = 100;
    }).toThrow(Error);
  });
});
