## Routes

Routes are declared in the 'common' folder so that both the client and the server have access to the same base routes without unnecessary duplication.  This allows you to use a *different router on the server* from the one you use in the client, which could allow you to lean out the client quite a bit.
