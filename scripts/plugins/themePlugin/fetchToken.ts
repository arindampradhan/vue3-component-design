import { get as httpsGet
 } from 'https';

const TOKEN_URL = 'https://raw.githubusercontent.com/deepakc-zeta/gds-tokens/main/tokens.json';

type TokenCallback = (status: number, data: Record<string, any> | Error) => void;

/**
 * Fetches a JSON file from the specified URL using HTTPS and parses it as a JavaScript object.
 *
 * @param {string} url - The URL from which to fetch the JSON data. Defaults to a predefined URL.
 * @param {TokenCallback} cb - A callback function that receives the HTTP response status and the parsed JSON data or an error.
 */
const getToken = (url: string = TOKEN_URL, cb: TokenCallback): void => {
	httpsGet(url, (res) => {
		let body = '';

		res.on('data', (chunk) => {
			body += chunk;
		});

		res.on('end', () => {
			try {
				let json = JSON.parse(body);
				cb(200, json);
			} catch (error) {
				cb(500, error);
			}
		});
	}).on('error', (error) => {
		cb(500, error);
	});
};

export default getToken;