<script>
    import {Link} from 'svelte-routing'
    let name = ''
    let password = ''

    async function handleRegister() {
        const response = await fetch('http://localhost:8000/register', {    
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                password
            })
        })
        const data = await response.json()
        if (response.ok) {
            alert('Registrado com sucesso!')
        } else {
            alert(data)
        }
    }
</script>

<main class="min-h-screen flex flex-col items-center justify-around">
    <h1 class="text-4xl">Registrar</h1>
    <div class="flex flex-col gap-4 bg-black/20 p-4 rounded">
        <label for="name">Nome:
            <input class="rounded px-2 p-1" bind:value={name} type="text" id="name" placeholder="José Bezerra">
        </label>
        <label for="password">Senha:
            <input class="rounded px-2 p-1" bind:value={password} type="password" id="password" placeholder="••••••••">
        </label>
        <button on:click={handleRegister}>Registrar</button>
    </div>
    <Link class="underline text-blue-700" to="/">Login</Link>
</main>