<script>
    import { navigate } from "svelte-routing";
    import { userId } from "../Store/userId";


    let notes = []
    async function getNotes() {
        const response = await fetch(`http://localhost:8000/notes/${$userId}`)
        const data = await response.json()
        if (response.ok) {
            notes = data
        } else {
            alert(data)
        }
    }
    getNotes()
</script>

<main>
    {#each notes as n}
        <li>n</li>
    {/each}
</main>