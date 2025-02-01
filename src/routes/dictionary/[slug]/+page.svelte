<script>
    export let data;
    console.log("wordData received in Svelte component:", data);
    const wordData = data?.data || [];
</script>

{#if data}
<div class="dictionary-entry">
    <h1>{wordData.term}</h1>
    <p>{wordData.definition}</p>
    <p><i>{wordData.example}</i></p>
    <p><strong>Explanation:</strong> {wordData.explanation}</p>
    
</div>
<p>Back <a href="/">home</a></p>
    
{:else}
    <p>Term not found.</p>
    <p>Back <a href="/">home</a></p>
{/if}

