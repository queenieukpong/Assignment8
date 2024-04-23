// Updated
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

// added daily withdrawal limit and amount that can be daily withdrawn
class BankAccount {
    constructor(accountNumber, firstName, lastName, dailyWithdrawalLimit=1000) {
        this._accountNumber = accountNumber;
        this._firstName = firstName;
        this._lastName = lastName;
        this._balance = 0;
        this._transactions = [];
        this._dailyWithdrawalLimit = dailyWithdrawalLimit; // Daily withdrawal limit in currency units
        this._lastWithdrawalDate = null; // Date of the last withdrawal
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

    // I am storing transactions as an array of objects containing type, amount, and timestamp properties.
    get transactions() {
        return this._transactions.map(transaction => {
            return {
                type: transaction.type,
                amount: transaction.amount,
                timestamp: transaction.timestamp
            };
        });
    }

    set dailyWithdrawalLimit(limit) {
        this._dailyWithdrawalLimit = limit;
    }

    get dailyWithdrawalLimit() {
        return this._dailyWithdrawalLimit;
    }

    deposit(amount) {
        this._balance += amount;
        this._transactions.push({
            type: "deposit",
            amount: amount,
            timestamp: new Date()
        });
    }

    withdraw(amount) {
        const today = new Date().toDateString();

        if (this._lastWithdrawalDate !== today) {
            this._lastWithdrawalDate = today;
            this._dailyWithdrawalAmount = 0;
        }

        if (amount <= this._balance && amount <= this._dailyWithdrawalLimit && (this._dailyWithdrawalAmount + amount) <= this._dailyWithdrawalLimit) {
            this._balance -= amount;
            this._transactions.push({
                type: "withdrawal",
                amount: amount,
                timestamp: new Date()
            });
            this._dailyWithdrawalAmount += amount;
        } else {
            console.log("Withdrawals not allowed. Please check if amount exceeds balance or daily withdrawal limit.");
        }
    }

        // I've also added a transfer method to transfer money between accounts.
    transfer(amount, recipientAccount) {
        if (amount <= this._balance && recipientAccount !== this && amount > 0) {
            this._balance -= amount;
            recipientAccount.deposit(amount);
            this._transactions.push({
                type: "transfer",
                amount: amount,
                timestamp: new Date(),
                recipientAccount: recipientAccount.accountHolder
            });
        } else {
            console.log("Transfer not allowed. Please check if amount exceeds balance or if the recipient account is valid.");
        }
    }

    getTransactions(){
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






// create a simulation of a bank account system: Bank account and transaction class 
// class Transaction {
//     constructor(type, amount) {
//         this._type = type;
//         this._amount = amount;
//         this._timestamp = new Date();
//     }

//     get type() {
//         return this._type;
//     }

//     get amount() {
//         return this._amount;
//     }

//     get timestamp() {
//         return this._timestamp;
//     }
// }

// class BankAccount {
//     constructor(accountNumber, firstName, lastName, dailyWithdrawalLimit = 5000) {
//         this._accountNumber = accountNumber;
//         this._firstName = firstName;
//         this._lastName = lastName;
//         this._balance = 0;
//         this._transactions = [];
//         this._dailyWithdrawalLimit = dailyWithdrawalLimit;
//         this._dailyWithdrawalAmountToday = 0;
        
//     }

//     get accountHolder() {
//         return `${this._firstName} ${this._lastName}`;
//     }

//     set accountNumber(accountNumber) {
//         this._accountNumber = accountNumber;
//     }

//     get accountNumber() {
//         return this._accountNumber;
//     }

//     get balance() {
//         return this._balance;
//     }

//     get transactions() {
//         return this._transactions;
//     }

//     get dailyWithdrawalLimit() {
//         return this._dailyWithdrawalLimit;
//     }

//     set dailyWithdrawalLimit(limit) {
//         this._dailyWithdrawalLimit = limit;
//     }

//     deposit(amount) {
//         this._balance += amount;
//         this._transactions.push(new Transaction("deposit", amount));
//     }

//     withdraw(amount) {
//         if (amount <= this._balance) {
//             this._balance -= amount;
//             this._transactions.push(new Transaction("withdrawal", amount));
//         } else {
//             console.log("Insufficient funds");
//         }
//     }

//     getTransactions() {
//         return this._transactions;
//     }
// }

// // Simulation Creating an Instance 
// let account = new BankAccount(123456789, "John", "Doe");

// account.deposit(1000);
// account.withdraw(500);
// account.deposit(200);
// account.withdraw(700);

// console.log("Account Holder:", account.accountHolder);
// console.log("Account Number:", account.accountNumber); // im using getter
// account.accountNumber = 987654321; // i'm using setter
// console.log("Updated Account Number:", account.accountNumber); // i'm also using getter here
// console.log("Balance:", account.balance);
// console.log("Transactions:");
// account.transactions.forEach((transaction, index) => {
//     console.log(`Transaction ${index + 1}: Type - ${transaction.type}, Amount - ${transaction.amount}, Timestamp - ${transaction.timestamp}`);
// });
