import React, { useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export default function VisibilityContainer({ children }) {
  function renderChildren(isVisible) {
    return isVisible ? children : <div>Loading</div>;
  }

  const [active, setActive] = useState(true);
  return (
    <VisibilitySensor onChange={active => setActive(!active)} active={active}>
      {({ isVisible }) => renderChildren(isVisible)}
    </VisibilitySensor>
  );
}
