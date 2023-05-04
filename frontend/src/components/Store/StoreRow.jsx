import StoreBox from './StoreBox';
import PropTypes from 'prop-types';

export default function StoreRow({ n, y }) {
  return [...Array(20).keys()].map(index => <StoreBox key={index} n={n} y={y} x={index} />);
}
StoreRow.propTypes = {
  n: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};
