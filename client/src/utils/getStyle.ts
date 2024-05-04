import classNames from "classnames/bind";

export default function getStyle(style) {
    const cx = classNames.bind(style);
    return cx;
}
