<script>
    import AuthenticatorForm from "./AuthenticatorForm.svelte";
    import LoginForm from "./LoginForm.svelte";

    let loginData = {
        id: 0
    }

    $:login = (e) => {
        loginData = e.detail;
    }
</script>

{#if loginData.id === 0}
    <LoginForm on:login={login}/>
{:else}
    <AuthenticatorForm/>
{/if}
