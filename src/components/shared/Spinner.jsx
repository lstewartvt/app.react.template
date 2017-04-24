import './styles/Spinner';

const Spinner = () => {

	return (
		<div className='spin-wrap'>
			<svg
				className='spinner'
				viewBox='0 0 66 66'
				xmlns='http://www.w3.org/2000/svg'>
					<circle
						className='path'
						cx='33'
						cy='33'
						fill='none'
						r='30'
						strokeLinecap='square'
						strokeWidth='5'>
					</circle>
			</svg>
			<shared.MdIcon>schedule</shared.MdIcon>
		</div>
	);
};

export default Spinner;