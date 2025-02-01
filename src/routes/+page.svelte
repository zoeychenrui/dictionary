<script>
  export let data;
  console.log(data)
  const entries = data?.data || [];
</script>

<h1>Dictionary</h1>
<ul>
  {#each entries as entry}
      <li>
          <a href={`/dictionary/${entry.term.toLowerCase().replace(/\s+/g, '-')}`}>
              {entry.term}
          </a>
      </li>
  {/each}
</ul>
