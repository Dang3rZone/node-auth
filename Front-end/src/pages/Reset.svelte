<script>
    import axios from "axios";
    import {push} from "svelte-spa-router";

    let password = '';
    let password_confirm = '';

    export let params;

    $: submit = async () => {
        await axios.post('reset', {
            password, password_confirm, token: params.token
        });

        await push('/login');
    }
</script>

<main class="form-signin">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Reset password</h1>

        <div class="form-floating">
            <input bind:value={password} type="password" class="form-control" id="floatingPassword"
                   placeholder="Password">
            <label for="floatingPassword">Password</label>
        </div>

        <div class="form-floating">
            <input bind:value={password_confirm} type="password" class="form-control" placeholder="Password Confirm">
            <label for="floatingPassword">Password confirm</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
    </form>
</main>