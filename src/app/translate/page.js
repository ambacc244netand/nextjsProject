'use client';

import {useCallback, useState} from 'react';
import styled from 'styled-components';

export default function Translate() {
	const [value, setValue] = useState('안녕');
	const [words, setWords] = useState([]);
	const onChangeSearchValue = useCallback((e) => {
		setValue(e.currentTarget.value);
	}, []);

	const onSubmitSearch = useCallback(async () => {
		const res = await fetch('/api/translate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({text: value}),
		});
		const json = await res.json();

		setWords(json.data);
	}, [value]);

	const onKeyPress = useCallback(async (e)=>{

			if (e.key === 'Enter')
		await 		onSubmitSearch()


	},[])

	return (
		<>
			<h1>Translate</h1>

			<div>간단한 문자를 입력해 주세요.</div>
				{/*<_Icon>*/}
				{/*	<svg*/}
				{/*		focusable='false'*/}
				{/*		xmlns='http://www.w3.org/2000/svg'*/}
				{/*		viewBox='0 0 24 24'*/}
				{/*	>*/}
				{/*		<path d='M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'></path>*/}
				{/*	</svg>*/}
				{/*</_Icon>*/}


			<_Input
				type={'text'}
				value={value}
				onChange={onChangeSearchValue}
				onKeyPress={onKeyPress}
			/>

			{words.map((v) => (
				<_Word key={v}>{v}</_Word>
			))}
		</>
	);
}
const _Icon = styled.span`
	height: 20px;
	line-height: 20px;
	width: 20px;
`;

const _Input = styled.input`
	display: flex;
	position: relative;
	min-height: 44px;
	background: #fff;
	border: 1px solid #dfe1e5;
	box-shadow: none;
	border-radius: 24px;
	margin: 0 auto;
	width: 638px;
	padding: 0px 20px;
	font-size: 16px;
`;

const _Word = styled.div`
	animation: 3s linear 1s infinite running slidein;
`;
