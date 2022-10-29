# Doge academy -  Phase 3 - Task 1

## Task 1 - Intro to Solana Web3 Development

## Goal
The goal of this task is to get familiarized with the most basic Solana development concepts, specifically the Solana account model and SPL token program.

## Core learnings
- Solana account model
- Solana transactions
- Solana token program

## Development and Enviroment Requirements

## Note-
* We will be using __DEVNET__ throughout this guide.
On __CLI__ this can be set using the following:
```
solana config set --url https://api.devnet.solana.com
```

On __Phantom__ wallet.
1. Go to the wallet settings
2. Go to 'Change Network'
3. Select Devnet


## 1- Create file wallet
___Required reading:__ [File System Wallet] (https://docs.solana.com/wallet-guide/file-system-wallet)
__Tasks:__
1. Use the Solana CLI to create a file wallet.
__Bonus:__
1.Import the file wallet to Phantom wallet.
 
## 2- Airdrop Solana to wallet
__Required reading:__
1. [Send and Recieve Tokens] (https://docs.solana.com/cli/transfer-tokens)
__Tasks:__ 
1. Use the Solana CLI to airdrop yourself 1 SOL to your file wallet.
2. Familiarize yourself with a transaction explorer. Track your airdrop transaction using [Solana explorer](https://explorer.solana.com/) or [SolanaFM](https://solana.fm/)

## 3- Solana account and Javascript
__Required reading:__
 1. [Solana account model] (https://docs.solana.com/developing/programming-model/accounts)
 2. [Solana account model - Solana Cookbook] (https://solanacookbook.com/core-concepts/accounts.html#account-model)
 3. [Solana Javascript API] (https://docs.solana.com/developing/clients/javascript-api#connecting-to-a-wallet)
 __Tasks:__
 1. Create a web app(NextJS recommended)
 2. Using the Solana Javascript API connect to your file wallet.
 3. Inspect the KeyPair datastructure.
 4. Compare the contents to the phantom wallet UI

 ## 3- Solana token program
__Required reading:__
 1. [Solana Token Program] (https://spl.solana.com/token)
 2. [Associated Token Account Program] (https://spl.solana.com/associated-token-account)
 __Tasks:__
 1. Create your own SPL token using the Javascript API, use your file wallet as the payer account. Keep track of the new Associated Token Account
 Note: The SPL token can be created using the CLI too, but we want to do this programatically.
 2. Create new wallet, this can be used phantom or it can be another file wallet.
 2. Create a transaction to transfer some of your SPL tokens to your new wallet.
 3. Check the new wallet on phantom. You should see your SPL token balance.
 4. Track your airdrop transaction using [Solana explorer](https://explorer.solana.com/) or [SolanaFM](https://solana.fm/)
 5. Extend your web app to airdrop some SPL tokens to a wallet given by the user. 
 Note: this can be done without connecting the actual wallet, remember Airdrop not claim
 6. Familiarize yourself with a transaction explorer. Track your airdrop transaction using [Solana explorer](https://explorer.solana.com/) or [SolanaFM](https://solana.fm/)

 ## 3- Solana token program
__Required reading:__
 1. [Solana Token Program] (https://spl.solana.com/token)
 2. [Associated Token Account Program] (https://spl.solana.com/associated-token-account)
 __Tasks:__
 1. Create your own SPL token using the Javascript API, use your file wallet as the payer account. Keep track of the new Associated Token Account
 Note: The SPL token can be created using the CLI too, but we want to do this programatically.
 2. Create new wallet, this can be used phantom or it can be another file wallet.
 2. Create a transaction to transfer some of your SPL tokens to your new wallet.
 3. Check the new wallet on phantom. You should see your SPL token balance.
 4. Extend your web app to airdrop some SPL tokens to the wallet given by the user. (Note: this can be done without connecting the actual wallet, remember Airdrop not claim)
 

