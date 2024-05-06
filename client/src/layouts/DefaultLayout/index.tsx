import React from "react";
import styles from "./DefaultLayout.module.scss";
import { getStyle } from "~/utils";
import { Header } from "~/components";

const cx = getStyle(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx("wrapper")}>
            <Header />
            <div className={cx("container")}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
