import React from "react";
import styles from "./style.module.scss";
import { getStyle } from "~/utils";

const cx = getStyle(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
