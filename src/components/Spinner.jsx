import React from 'react';
import { connect } from 'react-redux';
import Spin from 'antd/es/spin';
import Icon from 'antd/es/icon';

import * as COLOR from 'constants/colors';

function Spinner({ loading }) {
  return (
    <Spin
      className={loading ? 'spinner' : 'spinner closed'}
      spinning={loading}
      size="large"
      indicator={<Icon type="loading" style={{ color: COLOR.GREEN }} />}
    />
  );
}

const mapStateToProps = ({ globalInfo: { loading } }) => ({ loading });

export default connect(mapStateToProps)(Spinner);
