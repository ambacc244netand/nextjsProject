import axios from 'axios';
import {NextResponse} from 'next/server';
import process from 'next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss';

const detect_api_url = 'https://openapi.naver.com/v1/papago/detectLangs'
const api_url = 'https://openapi.naver.com/v1/papago/n2mt';


const languages = [
	'en',
	'ko',
	'ja',
	'zh-CN',
	'vi',
	'id',
	'th',
	'de',
	'ru',
	'es',
	'it',
	'fr',
];

export async function POST(req, res) {
	const dataArr = new Array();
	const body = await req.json();

	//  const response = await axios.post(
	// 	 detect_api_url,
	// 	{query: body.text},
	// 	{
	// 		headers: {
	// 			'Content-Type':
	// 				'text/json;charset=utf-8',
	// 			'X-Naver-Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID,
	// 			'X-Naver-Client-Secret': process.env.NEXT_PUBLIC_CLIENT_SECRETE,
	// 		},
	// 	},
	// );
	//
	//  console.log(response.data)

	await Promise.all(
		languages.map(async (v) => {
			if (v !== 'ko') {
				const response = await axios.post(
					process.env.NEXT_PUBLIC_PAPAGO_URL,
					{source: 'ko', target: v, text: body.text},
					{
						headers: {
							'Content-Type':
								'application/x-www-form-urlencoded; charset=UTF-8',
							'X-Naver-Client-Id': process.env.NEXT_PUBLIC_CLIENT_ID,
							'X-Naver-Client-Secret':  process.env.NEXT_PUBLIC_CLIENT_SECRETE,
						},
					},
				);

				dataArr.push(response.data.message.result.translatedText);
			}
		}),
	);
	console.log(dataArr);
	return NextResponse.json({data: dataArr});
}
