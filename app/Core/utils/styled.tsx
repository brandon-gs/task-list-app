import {PropsWithChildren, forwardRef} from 'react';
import {StyledProps, useStyledSystemPropsResolver} from 'native-base';

export function makeStyledComponent<T>(Comp: any) {
  return forwardRef((props: PropsWithChildren<T & StyledProps>, ref: any) => {
    const [style, restProps] = useStyledSystemPropsResolver(props);
    return (
      <Comp {...restProps} style={style} ref={ref}>
        {props.children}
      </Comp>
    );
  });
}
