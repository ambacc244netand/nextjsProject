import Script from 'next/script';

export const metadata = {
	title: 'JS Page',
	description: '포켓몬 수집 Map 관련 웹입니다.',
};
export default function Layout({children}) {
	return (
		<html lang='en'>
			<head>
				<title>{metadata.title}</title>
				<Script
					strategy={'beforeInteractive'}
					src={
						'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=' +
						process.env.NEXT_PUBLIC_MAP_KEY
					}
				/>
			</head>
			<body>{children}</body>
		</html>
	);
}
