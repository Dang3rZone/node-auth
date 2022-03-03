<script>
    import axios from "axios";
    import {link} from "svelte-spa-router";
    import {createEventDispatcher} from "svelte";

    let email = '';
    let password = '';

    const dispatch = createEventDispatcher();

    $: submit = async () => {
        const {data} = await axios.post('login', {
            email, password
        });

        dispatch('login', data);
    }
</script>

<main class="form-signin">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Please sign in!</h1>

        <div class="form-floating">
            <input bind:value={email} type="email" class="form-control" id="floatingInput"
                   placeholder="name@example.com">
            <label>Email address</label>
        </div>

        <div class="form-floating">
            <input bind:value={password} type="password" class="form-control" id="floatingPassword"
                   placeholder="Password">
            <label for="floatingPassword">Password</label>
        </div>

        <div class="mb-3">
            <a href="/forgot" use:link> Forgot password?</a>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </form>
</main>