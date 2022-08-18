const http = require('http')
const solanaWeb3 = require('@solana/web3.js');
const solanaSplToken = require('@solana/spl-token');

const hostname = '127.0.0.1'
const port = 3000

const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'), 'confirmed');

// Request Solana Devnet for an airdrop of {solanaTokens}
const airDropSol =  async (toKeypair, solanaTokens) => {
  console.log(`Airdroping sol to ${toKeypair.publicKey}`);
  try {
    const airdropSignature = await connection.requestAirdrop(
      toKeypair.publicKey,
      solanaTokens * solanaWeb3.LAMPORTS_PER_SOL
    );
  
    const latestBlockHash = await connection.getLatestBlockhash();
  
    await connection.confirmTransaction({
      blockhash: latestBlockHash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });
  } catch (error) {
    console.error(error);
  }
}

// Send Solana from walle to another wallet 
async function sendSolTransaction (fromKeypair, toPublicKey, tokensToSend) {
  console.log('Sending SOL to wallet');
  const lamportsToSend = tokensToSend * solanaWeb3.LAMPORTS_PER_SOL;
  try {
    const transaction = new solanaWeb3.Transaction().add(
      solanaWeb3.SystemProgram.transfer({
        fromPubkey : fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: lamportsToSend
      })
    );
    const signature = await solanaWeb3.sendAndConfirmTransaction(connection, transaction, [fromKeypair])
    console.log(`Transaction ${signature}`);

  } catch (error) {
    console.error(error);
  }
}

// Creates SPL token
// Creates ATA for SPL token
// Mints SPL token
const mintSplToken = async (payerKeypair, mintAuthorityKeypair, freezeAuthoriyKeypair, tokensToMint) => {
  console.log('Creating SPL token');
  try {
    const tokenAddress = await solanaSplToken.createMint(
      connection,
      payerKeypair,
      mintAuthorityKeypair.publicKey,
      freezeAuthoriyKeypair.publicKey,
      9
    );
    console.log(`Created SPL token ${tokenAddress.toBase58()}`);

    const tokenAccount = await solanaSplToken.getOrCreateAssociatedTokenAccount(
      connection,
      payerKeypair,
      tokenAddress,
      payerKeypair.publicKey);
    console.log(`Created ATA ${tokenAccount.address.toBase58()} `);
    
    const splTokens = tokensToMint * solanaWeb3.LAMPORTS_PER_SOL;
    await solanaSplToken.mintTo(
      connection,
      payerKeypair,
      tokenAddress,
      tokenAccount.address,
      mintAuthorityKeypair,
      splTokens
    );

    const tokenAccountInfo = await solanaSplToken.getAccount(
      connection,
      tokenAccount.address
    );
    console.log(`Minted tokens ${tokenAccountInfo.amount}`)
    return [tokenAddress, tokenAccount];
  } catch (error) {
    console.error(error);
  }
}

// Send SPL token to wallet
// Note: need to create ATA for the specific token in receiving wallet
async function sendSplTransaction (tokenAddress, tokenAccount, fromKeypair, toPublicKey, tokensToSend) {
  console.log(`Sending Spl tokens`);

  try {
    let tokenAccounts = await connection.getTokenAccountsByOwner(
      toPublicKey,
      {
        programId: solanaSplToken.TOKEN_PROGRAM_ID,
      }
    );

    const toTokenAccount = await solanaSplToken.getOrCreateAssociatedTokenAccount(
      connection,
      fromKeypair,
      tokenAddress,
      toPublicKey);

    console.log(`Created ATA ${toTokenAccount.address.toBase58()}  `);

    const lamportsToSend = tokensToSend * solanaWeb3.LAMPORTS_PER_SOL;
    const signature = await solanaSplToken.transfer(
      connection,
      fromKeypair,
      tokenAccount.address,
      toTokenAccount.address,
      fromKeypair.publicKey,
      lamportsToSend
    );
    console.log(`Transaction ${signature}`);


  } catch (error) {
    console.error(error);
  }
}

const server = http.createServer(async (req, res) => {
  console.log('Starting transaction');

  console.log('Creating sol keypair');
  const primaryKeypair = solanaWeb3.Keypair.generate();
  await airDropSol(primaryKeypair, 2);

  const toPublicKey = new solanaWeb3.PublicKey('HtUaVzWiSNrrY2NSVKroE3883vnBfn8SMrLM2UxA2vDy');
  await sendSolTransaction(primaryKeypair, toPublicKey, 0.1);
  
  console.log('Creating spl token keypair');
  const mintAuthorityKeypair = solanaWeb3.Keypair.generate();
  const freezeAuthorityKeypair = solanaWeb3.Keypair.generate();

  const tokenMetadata = await mintSplToken(primaryKeypair, mintAuthorityKeypair, freezeAuthorityKeypair, 100);
  await sendSplTransaction(tokenMetadata[0], tokenMetadata[1], primaryKeypair, toPublicKey, 0.1);

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Transaction successful\n')
})

server.listen(port, hostname, () => {
  console.log('Task 3')
})