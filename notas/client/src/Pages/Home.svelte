<script>
	import { userId } from '../Store/userId';
	import CardNote from '../Components/CardNote.svelte';
    let newNoteContent = '';

	let notes = [];
	async function getNotes() {
		const response = await fetch(`http://localhost:8000/notes/${$userId}`);
		const data = await response.json();
		if (response.ok) {
			notes = data;
			console.log(notes);
		} else {
			alert(data);
		}
	}
	getNotes();

    async function createNote() {
        const response = await fetch(`http://localhost:8000/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: $userId,
                content: newNoteContent,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            notes = [...notes, data];
        } else {
            alert(data);
        }
    }
</script>

<main class="min-h-screen grid grid-rows-[auto_1fr] gap-4 p-4 justify-center">
	<div class="w-96 bg-yellow-200 p-4 rounded flex flex-col gap-4">
		<button on:click={createNote} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Criar nota</button>
		<textarea cols="40" rows="10" bind:value={newNoteContent} />
	</div>
	<div class="w-fit flex flex-col gap-4">
		{#each notes as n}
			<CardNote note={n} />
		{/each}
	</div>
</main>
