export async function dataQuery(query: string, fnName: string) {
    try {
        const response = await fetch("http://localhost:3005/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query,
            }),
        });
        const data = await response.json();

        const result = data?.data[fnName];
        if (!result) throw new Error("Empty responsed data");
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
