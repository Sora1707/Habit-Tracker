import React, { memo } from "react";
import { Form } from "react-bootstrap";

function SwitchButton({ disabled, checked, onChange }) {
    const handleChange = () => {
        onChange();
    };

    return (
        <Form>
            <Form.Check
                type="switch"
                id="custom-switch"
                disabled={disabled}
                checked={checked}
                onChange={handleChange}
            />
        </Form>
    );
}

export default memo(SwitchButton);
