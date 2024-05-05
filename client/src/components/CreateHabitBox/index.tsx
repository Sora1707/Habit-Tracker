import React, { useState } from "react";
import { getStyle } from "~/utils";
import styles from "./CreateHabitBox.module.scss";
import { Button, Col, Form, Row } from "react-bootstrap";

const cx = getStyle(styles);

function CreateHabitBox() {
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState(0);
    const [color, setColor] = useState("#000000");

    console.log(content, priority, color);

    return (
        <Form className={cx("container")}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor="habitContentInput">Content</Form.Label>
                <Form.Control
                    id="habitContentInput"
                    type="input"
                    value={content}
                    placeholder="Exercise for 30 minutes"
                    onChange={e => setContent(e.target.value)}
                />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label htmlFor="habitPriorityInput">
                        Priority
                    </Form.Label>
                    <Form.Control
                        id="habitPriorityInput"
                        value={priority}
                        type="number"
                        placeholder="Priority for this habit"
                        onChange={e => setPriority(parseInt(e.target.value))}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label htmlFor="habitColorInput">
                        Color picker
                    </Form.Label>
                    <Form.Control
                        type="color"
                        id="habitColorInput"
                        defaultValue={color}
                        title="Choose your color"
                        onChange={e => setColor(e.target.value)}
                    />
                    <Form.Control type="input" value={color} disabled />
                </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default CreateHabitBox;
