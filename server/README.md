## Server Example

The full api is obviously up to you - this is just an example of how to impliment routing in something like express.  You're free to do whatever you need to do on the server side. :)

The client *does* make the assumption that you've implimented some sort of access token api, which is only implimented in a naieve way in `mockApi.js`.  For all content requests that require authorization, the token's `id` should be passed back to the server to verify the user's authorization.

The access token would look like:

```
{
  id: [token hash value],
  ttl: [<Time> ms until token expires],
  created: [<Date> when the token was generated],
  userId: [id for the user that this token is for]
}
```
