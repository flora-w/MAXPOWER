import React from 'react';
import Row from 'antd/es/row';
import Empty from 'antd/es/empty';

export default function EmptyComp() {
  return (
    <Row className="dbl-margin dbl-padding">
      <Empty image="/images/empty.png" description=" " />
    </Row>
  );
}
