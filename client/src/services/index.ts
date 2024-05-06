export async function dataQuery<T>(query: string, fnName: string): Promise<T> {
    try {
        const response = await fetch("http://localhost:3005/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                query {
                    ${query}
                }
                `,
            }),
        });
        const data = await response.json();

        const result: T = data?.data[fnName];
        if (!result) throw new Error("Empty responsed data");
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function dataMutation<T>(
    query: string,
    fnName: string
): Promise<T> {
    try {
        const response = await fetch("http://localhost:3005/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                mutation {
                    ${query}
                }
                `,
            }),
        });
        const data = await response.json();

        const result: T = data?.data[fnName];
        if (!result) throw new Error("Cannot perform the mutation");
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
