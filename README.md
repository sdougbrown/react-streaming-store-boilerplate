# React Streaming Store Boilerplate

This is one way to approach client-side application structure that won't make you go totally insane. :smile:

A full write-up is forthcoming, but essentially the point if this kind of structure is to allow views to interact with the store directly (when necessary) without a ton of boilerplate or magic. (And yes, I can see the irony here...)

The application then has two core paths - the store path, which interacts via actions with the api, and the view path which interacts with the store for up-to-date data.

While the idea here is to show off the store model and how it fits into a "real" application, there are a few extras built in here...

 - Client/Server Routing
 - SVG Icons
 - Hot Reloading
 - User "Authentication"
 - Style Loading
 - ESLint Rules (Slightly Different for Client & Server)

While you could go further and have this application fully-isomorphic and fully-transpiled, I feel that that goes well beyond the scope of this example and would obscure some of the important concepts and make it harder to follow.  As a result, only the client side scripts are transpiled - the common and server files should run in node 6+ natively.


## Running this beast...

```
$ yarn / npm install
```

If you don't have node 6+ installed but you do have nvm, you can...
```
nvm use
```

Then just...

```
$ yarn run dev / npm run dev
```
