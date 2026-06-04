import { useState } from "react";

function useInput(initialValue = "") {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    };

    const reset = () => {
        setValue(initialValue);
    };

    return {
        value,
        setValue,
        reset,
        inputProps: {
            value,
            onChange
        }
    };
}

export default useInput;