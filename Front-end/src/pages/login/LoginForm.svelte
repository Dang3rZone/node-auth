<script>
    import axios from "axios";
    import {link, push} from "svelte-spa-router";
    import {createEventDispatcher} from "svelte";
    import {GoogleAuth} from '@beyonk/svelte-social-auth';
    import {authenticated} from "../../store/auth";

    let email = '';
    let password = '';

    const dispatch = createEventDispatcher();

    $: submit = async () => {
        const {data} = await axios.post('login', {
            email, password
        });

        dispatch('login', data);
    }

    $:googleAuth = async (e) => {
        const {data, status} = await axios.post('google-auth', {token: e.detail.user.wc.id_token}, {withCredentials: true});

        if (status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            authenticated.set(true);

            await push('/');
        }
    }
</script>

<form on:submit|preventDefault={submit} class="mb-3">
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
</form>

<GoogleAuth clientId="255988591849-p2jeccltaj2h2alp3mlr4ek8eifun874.apps.googleusercontent.com"
            on:auth-success={googleAuth}/>
<p class="mt-5 mb-3 text-muted">&copy; 2017–2022</p>
