import { createElement } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@mui/icons-material';

export default function DynamicIcon(props) {
  return createElement(Icons[props.icon], props);
}

DynamicIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};
