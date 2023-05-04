import { createElement } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@mui/icons-material';

export default function DynamicIcon({ icon }) {
  return createElement(Icons[icon]);
}

DynamicIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};
