// Assignment 3 updated
class Transaction {
    constructor(type, amount) {
        this._type = type;
        this._amount = amount;
        this._timestamp = new Date();
    }

    get type() {
        return this._type;
    }

    get amount() {
        return this._amount;
    }

    get timestamp() {
        return this._timestamp;
    }

    toString() {
        return `${this._type} ${this._amount} ${this._timestamp}`;
    }
}

class BankAccount {
    constructor(accountNumber, firstName, lastName, dailyWithdrawalLimit = 1000) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._balance = 0;
        this._transactions = [];
        this._dailyWithdrawalLimit = dailyWithdrawalLimit;
        this._lastWithdrawalDate = null;
        this._dailyWithdrawalAmount = 0; // Added
    }

    get accountHolder() {
        return `${this._firstName} ${this._lastName}`;
    }

    get accountNumber() {
        return this._accountNumber;
    }

    get balance() {
        return this._balance;
    }

    get transactions() {
        return this._transactions.map(transaction => ({
            type: transaction.type,
            amount: transaction.amount,
            timestamp: transaction.timestamp
        }));
    }

    set dailyWithdrawalLimit(limit) {
        this._dailyWithdrawalLimit = limit;
    }

    get dailyWithdrawalLimit() {
        return this._dailyWithdrawalLimit;
    }

    deposit(amount) {
        this._balance += amount;
        this._transactions.push(new Transaction("deposit", amount));
    }

    withdraw(amount) {
        const today = new Date().toDateString();

        if (this._lastWithdrawalDate !== today) {
            this._lastWithdrawalDate = today;
            this._dailyWithdrawalAmount = 0;
        }

        if (amount <= this._balance && amount <= this._dailyWithdrawalLimit && (this._dailyWithdrawalAmount + amount) <= this._dailyWithdrawalLimit) {
            this._balance -= amount;
            this._transactions.push(new Transaction("withdrawal", amount));
            this._dailyWithdrawalAmount += amount;
        } else {
            throw new Error("Withdrawals not allowed. Please check if the amount exceeds the balance or daily withdrawal limit.");
        }
    }

    transfer(amount, recipientAccount) {
        if (!recipientAccount || recipientAccount === this || amount <= 0) {
            throw new Error("Transfer not allowed. Please check if the recipient account is valid and the amount is positive.");
        }

        if (amount <= this._balance) {
            this._balance -= amount;
            recipientAccount.deposit(amount);
            this._transactions.push(new Transaction("transfer", amount));
        } else {
            throw new Error("Transfer not allowed. Please check if the amount exceeds the balance.");
        }
    }

    getTransactions() {
        return this.transactions;
    }
}

// Simulation
let account1 = new BankAccount(123456789, "Johnny", "Swagger");
let account2 = new BankAccount(987654321, "Jane", "Smith");

account1.deposit(2000);
account2.deposit(500);

account1.withdraw(1000);
account1.withdraw(800);
account1.withdraw(400);

console.log("Account Holder:", account1.accountHolder);
console.log("Balance:", account1.balance);
console.log("Transactions:", account1.transactions);

console.log("Account Holder:", account2.accountHolder);
console.log("Balance:", account2.balance);
console.log("Transactions:", account2.transactions);

account1.transfer(500, account2);
console.log("After transfer:");
console.log("Account Holder:", account1.accountHolder);
console.log("Balance:", account1.balance);
console.log("Transactions:", account1.transactions);

console.log("Account Holder:", account2.accountHolder);
console.log("Balance:", account2.balance);
console.log("Transactions:", account2.transactions);
