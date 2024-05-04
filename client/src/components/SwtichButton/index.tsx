import React, { memo, useState } from "react";
import { Form } from "react-bootstrap";

function SwitchButton({ checked, onChange }) {
    const [checkedValue, setCheckedValue] = useState(false);

    const handleChange = () => {
        setCheckedValue(!checkedValue);
        onChange();
    };

    return (
        <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                checked={checked}
                onChange={handleChange}
            />
        </Form>
    );
}

export default memo(SwitchButton);
