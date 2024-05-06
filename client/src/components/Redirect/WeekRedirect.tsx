import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DayRedirect() {
    console.log("here");
    const navigate = useNavigate();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const newPath = `/week/${year}/${month}/${day}`;

    // Check if the current path is already /day to avoid infinite redirects
    useEffect(() => navigate(newPath));

    return null;
}

export default DayRedirect;
