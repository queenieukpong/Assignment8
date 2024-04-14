// create a simulation of a bank account system
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
}

class BankAccount {
    constructor(accountNumber, firstName, lastName) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._balance = 0;
        this._transactions = [];
    }

    get accountHolder() {
        return `${this._firstName} ${this._lastName}`;
    }

    set accountNumber(accountNumber) {
        this._accountNumber = accountNumber;
    }

    get accountNumber() {
        return this._accountNumber;
    }

    get balance() {
        return this._balance;
    }

    get transactions() {
        return this._transactions;
    }

    deposit(amount) {
        this._balance += amount;
        this._transactions.push(new Transaction("deposit", amount));
    }

    withdraw(amount) {
        if (amount <= this._balance) {
            this._balance -= amount;
            this._transactions.push(new Transaction("withdrawal", amount));
        } else {
            console.log("Insufficient funds");
        }
    }

    getTransactions() {
        return this._transactions;
    }
}

// Simulation Creating an Instance 
let account = new BankAccount(123456789, "John", "Doe");

account.deposit(1000);
account.withdraw(500);
account.deposit(200);
account.withdraw(700);

console.log("Account Holder:", account.accountHolder);
console.log("Account Number:", account.accountNumber); // im using getter
account.accountNumber = 987654321; // i'm using setter
console.log("Updated Account Number:", account.accountNumber); // i'm also using getter here
console.log("Balance:", account.balance);
console.log("Transactions:");
account.transactions.forEach((transaction, index) => {
    console.log(`Transaction ${index + 1}: Type - ${transaction.type}, Amount - ${transaction.amount}, Timestamp - ${transaction.timestamp}`);
});
