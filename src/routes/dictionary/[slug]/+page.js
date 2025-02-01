export async function load({ params, fetch }) {
    const res = await fetch("/api/dictionary");

    if (!res.ok) {
        throw new Error("Failed to fetch dictionary data");
    }

    const dictionaryData = await res.json();
    const data = dictionaryData.find((/** @type {{ term: string; }} */ word) => word.term.toLowerCase().replace(/\s+/g, '-') === params.slug);
    console.log(data);

    if (!data) {
        return {
            status: 404,
            error: `Term "${params.slug}" not found`,
        };
    }

    return {
        data
    };
}
