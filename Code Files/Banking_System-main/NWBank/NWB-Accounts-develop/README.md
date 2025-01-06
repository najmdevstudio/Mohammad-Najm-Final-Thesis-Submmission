# Accounts Service

## Main Objectives

- Manages various types of accounts (Savings, Current, Fixed Deposit, Loan accounts) under a CIN.
- Handles account creation, updates, and retrieval.
- Maintains account balances and statuses.
- Stores account data in its own relational database.

## Possible Connected Services

- Transaction Service
- Transfer Service
- Customer Service
- Loan Service
- Fixed Deposits Service
- Notification Service

## Structure

- Springboot Service (Scalable Multiple Instances).
- Connected Central DB.
- Connected MQ Service Consumer.

