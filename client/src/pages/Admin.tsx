const Admin = () => {
	return (
		<div className='mainPage admin'>
			<div className='child child1'>
				<h3 className='sectionHeading'>이 목사님, 환영합니다!</h3>
				<form className='createMessageForm'>
					<label htmlFor='title'>말씀 제목</label>
					<input type='text' id='title' name='title' placeholder='말씀 제목'></input>
					<label htmlFor='title'>날짜</label>
					<input type='date' id='date' name='date'></input>
					<label htmlFor='title'>목화자의 말씀</label>
					<textarea id='message' name='message'></textarea>
					<div className='formBtnBox'>
						<button type='button' className='pageBtn'>저장하기</button>
						<button type='button' className='pageBtn'>삭재하기</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Admin;