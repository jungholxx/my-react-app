import { useSelector, useDispatch } from "react-redux";

import {
  increase,
  decrease,
  reset
} from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>

      <button onClick={() => dispatch(increase())}>
        증가
      </button>

      <button onClick={() => dispatch(decrease())}>
        감소
      </button>

      <button onClick={() => dispatch(reset())}>
        초기화
      </button>

    </div>
  );
}

export default Counter;