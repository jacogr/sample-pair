import { Keyring } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import { cryptoWaitReady, encodeAddress, mnemonicGenerate, mnemonicToMiniSecret, naclKeypairFromSeed } from '@polkadot/util-crypto';

async function main () {
  await cryptoWaitReady();

  const mnemonic = mnemonicGenerate();
  const seed = mnemonicToMiniSecret(mnemonic);
  const { publicKey } = naclKeypairFromSeed(seed);

  console.log('via nacl', encodeAddress(publicKey, 0));

  const keyring = new Keyring({ type: 'ed25519', ss58Format: 0 });
  const pair = keyring.addFromUri(u8aToHex(seed));

  console.log('via pair', pair.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);

    process.exit(-1);
  });
