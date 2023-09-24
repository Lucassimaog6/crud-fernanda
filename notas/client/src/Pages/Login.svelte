<script>
	import { Link, navigate } from 'svelte-routing';
	import { userId } from '../Store/userId';
	let name = '';
	let password = '';

	async function handleLogin() {
		const response = await fetch('http://localhost:8000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				password,
			}),
		});
		const data = await response.json();
		if (response.ok) {
			userId.set(data.id);
			navigate('/home');
		} else {
			alert(data);
		}
	}
</script>

<main class="min-h-screen flex flex-col items-center justify-around">
	<h1 class="text-4xl">Login</h1>
	<div class="flex flex-col gap-4 bg-black/20 p-4 rounded">
		<label for="name"
			>Nome:
			<input class="rounded px-2 p-1" bind:value={name} type="text" id="name" placeholder="José Bezerra" />
		</label>
		<label for="password"
			>Senha:
			<input
				class="rounded px-2 p-1"
				bind:value={password}
				type="password"
				id="password"
				placeholder="••••••••"
			/>
		</label>
		<button on:click={handleLogin}>Login</button>
	</div>
	<Link class="underline text-blue-700" to="/register">Registrar</Link>
</main>
