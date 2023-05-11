import StoreBox from './StoreBox';
import PropTypes from 'prop-types';

export default function StoreRow(props) {
  return [...Array(props.sx).keys()].map(index => <StoreBox key={index} x={index} {...props} />);
}
StoreRow.propTypes = {
  sx: PropTypes.number.isRequired,
};
