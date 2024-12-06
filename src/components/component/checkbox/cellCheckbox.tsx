import React, { useEffect, useRef } from "react";
import "./cellCheckbox.scss";

export const CellCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: any, ref: any) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div className="checkbox">
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    );
  }
);
