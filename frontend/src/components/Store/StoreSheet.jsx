import PropTypes from 'prop-types';
import StoreRow from './StoreRow';

export default function StoreSheet({ n }) {
  return (
    <div className='storeSheet'>
      {[...Array(10).keys()].map(index => (
        <div key={index} className='storeRow'>
          <StoreRow n={n} y={index} />
        </div>
      ))}
    </div>
  );
}
StoreSheet.propTypes = {
  n: PropTypes.number.isRequired,
};
