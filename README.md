# React Streaming Store Boilerplate

This is one way to approach client-side application structure that won't make you go totally insane. :smile:

A full write-up is forthcoming, but essentially the point if this kind of structure is to allow views to interact with the store directly (when necessary) without a ton of boilerplate or magic.

The application then has two core paths - the store path, which interacts via actions with the api, and the view path which interacts with the store for up-to-date data.
