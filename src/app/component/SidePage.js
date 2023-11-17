export default function SidePage() {
	return (
		<>
			<p>
				위치 검색 :{' '}
				<input
					type={'text'}
					name={'search'}
					placeholder={'위치를 입력하세요'}
				/>
			</p>
			<div>
				자주가는 장소
				<div>여의도</div>
				<div>압구정역</div>
			</div>
			<div>
				포켓몬 목록
				<div>피카츄</div>
			</div>
		</>
	);
}
