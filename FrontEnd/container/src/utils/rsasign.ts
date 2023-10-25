const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArH4ANbFYaowJ9qNCjDaJ
IPcJVjdazeVIAX6IpCp2SKlys21o0jtDXDUm9Gtk6MBa0kFX2Ri+XUxlZPOsYa0q
OloX8OdZ25cg0NPRN1euL69b/AQDzfZ/POigvQOdy+kMpnzG7dkgiTWpsA45UGDP
j0U5rhj/t4p2DKGOvxIjyK9jpq2kZlkU9Lv5o9psCjZAs3YvGKnt++qAqE8EHLUy
VfKyE4xiDQFT3/LR2e0PNidJMfrE9p9cJ4ZrdbvfcpJDRPLPU+7VIL7Rf3lM3koI
9UQHwFqJJ6Bd34EK7zSKfaMm1r3S2upVsLZpmmhM2NXSeY98Ua9MaWa2L4sYJn1D
DwIDAQAB
-----END PUBLIC KEY-----
`;
declare const window: any;
// 获取签名
export function getSHA256withRSA(content: string) {
	if (!content) return;
	let encrypt;
	if (!!window.encrypt) {
		encrypt = window.encrypt;
	} else {
		const { JSEncrypt } = require("jsencrypt");
		encrypt = new JSEncrypt();
		window.encrypt = encrypt;
	}

	encrypt.setPublicKey(publicKey);
	return encrypt.encrypt(content);
}
