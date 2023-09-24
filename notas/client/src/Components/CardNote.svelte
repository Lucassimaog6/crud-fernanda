<script>
    export let note;
    import Trash from "/public/Trash.svg"

    async function deleteNote() {
        const response = await fetch(`http://localhost:8000/notes/${note.id}`, {
            method: "DELETE"
        })
        const data = await response.json()
        if (response.ok) {
            console.log(data)
        } else {
            alert(data)
        }
    }
</script>

<main class="w-96 bg-yellow-200 p-4 rounded relative">
    <p>{note.content}</p>
    <button on:click={deleteNote} class="absolute top-2 right-2">
        <img src={Trash} alt="Imagem do botão de excluir nota">
    </button>
</main>