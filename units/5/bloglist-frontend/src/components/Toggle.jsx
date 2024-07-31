import { useState, forwardRef, useImperativeHandle } from "react";

const Toggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  if (visible) {
  }

  return (
    <div>
      {!visible && (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      )}

      {visible && (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </div>
  );
});

export default Toggle;
