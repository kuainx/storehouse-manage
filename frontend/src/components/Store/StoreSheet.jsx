import PropTypes from 'prop-types';
import StoreRow from './StoreRow';

export default function StoreSheet(props) {
  return (
    <div className='storeSheet'>
      {[...Array(props.sy).keys()].map(index => (
        <div key={index} className='storeRow'>
          <StoreRow y={index} {...props} />
        </div>
      ))}
    </div>
  );
}
StoreSheet.propTypes = {
  n: PropTypes.number.isRequired,
  sy: PropTypes.number.isRequired,
};
