import { writable } from 'svelte/store';
import { navigate } from 'svelte-routing';

export let userId = writable();

userId.subscribe((value) => {
	console.log('userId changed to ' + value);
    if (value === undefined) {
        navigate('/');
    }
});
