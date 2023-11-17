'use client';
import {useEffect, useRef, useState} from 'react';

const obj = [
	{
		id: 1,
		name: '꼬북이',
		img: '/image/꼬북이.png',
		position: 'Seoul Station',
		dotData: {
			lat: 37.55298702,
			lng: 126.97259173,
		},
	},
	{
		id: 2,
		name: '냐옹이',
		img: '/image/냐옹이.png',
		position: 'Yeouido',
		dotData: {
			lat: 37.521715859,
			lng: 126.924290018,
		},
	},
	{
		id: 3,
		name: '넌누구냐',
		img: '/image/넌누구냐.png',
		position: 'Sillim',
		dotData: {
			lat: 37.484171739,
			lng: 126.929784067,
		},
	},
	{
		id: 4,
		name: '뮤',
		img: '/image/뮤.png',
		position: 'Sillim',
		dotData: {
			lat: 37.484131739,
			lng: 126.929784067,
		},
	},
	{
		id: 5,
		name: '이상해씨',
		img: '/image/이상해씨.png',
		position: 'Sillim',
		dotData: {
			lat: 37.484141739,
			lng: 126.929784067,
		},
	},
	{
		id: 6,
		name: '파이리',
		img: '/image/파이리.png',
		position: 'Sillim',
		dotData: {
			lat: 37.484171739,
			lng: 126.922784067,
		},
	},
	{
		id: 7,
		name: '피카츄',
		img: '/image/피카츄.png',
		position: 'Sillim',
		dotData: {
			lat: 37.484171739,
			lng: 126.925784067,
		},
	},
];
const NaverMap = () => {
	const mapElement = useRef(null);
	const [myLocation, setMyLocation] = useState({});

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setMyLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			() => {
				alert('현재 위치를 알 수 없습니다.');
				setMyLocation({
					latitude: 37.521715859,
					longitude: 126.924290018,
				});
			},
		);
	}, []);

	useEffect(() => {
		const naverMap = window.naver.maps;
		const currentPosition = [myLocation.latitude, myLocation.longitude];

		const mapOptions = {
			center: new naverMap.LatLng(currentPosition[0], currentPosition[1]),
			zoom: 15,
			zoomControl: false,
		};

		mapElement.current = new naverMap.Map('map', mapOptions);
	}, [myLocation]);

	useEffect(() => {
		const naverMap = window.naver.maps;

		obj.forEach((v) => {
			const otherMarkers = new naverMap.Marker({
				position: new naverMap.LatLng(v.dotData.lat, v.dotData.lng),
				map: mapElement.current,
				//아이콘 커스텀
				// icon: {
				// 	content: [markerHtml('현재 위치')].join(''),
				// 	size: new window.naver.maps.Size(38, 58),
				// 	anchor: new window.naver.maps.Point(19, 58),
				// },
			});

			naverMap.Event.addListener(otherMarkers, 'click', (e) => {
				markerMove(v, e);
				infoContent(v, otherMarkers);
			});
		});
	}, [mapElement.current]);

	const markerMove = (v, e) => {
		const naverMap = window.naver.maps;
		const latLng = new naverMap.LatLng(v.dotData.lat, v.dotData.lng);
		mapElement.current.panTo(latLng, e?.coord);
	};

	const infoContent = (v, marker) => {
		const naverMap = window.naver.maps;

		const contentString = [
			'<div style="text-align: center">',
			`   <h3>${v.name}</h3>`,
			`   <img src=${v.img} alt=${v.name} width="50px"/>`,
			'</div>',
		].join('');

		let infowindow = new naverMap.InfoWindow({
			content: contentString,
		});
		if (infowindow.getMap()) {
			infowindow.close();
		} else {
			infowindow.open(mapElement.current, marker);
		}
	};

	return (
		<>
			<div id={'map'} style={{minHeight: '500px', maxWidth: '500px'}} />
		</>
	);
};

export default NaverMap;
