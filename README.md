# Fleek Assignment Backend

This backend is an authenticated proxy to access a private IPFS node with a few additional features.

## Instructions

1. Install Postman, add team https://app.getpostman.com/join-team?invite_code=14fdb7b3d3b3c10a2a746c08faed823c. Install Docker. Install IPFS Daemon (ensure it's running on 5001 or change this config).
2. Copy **.env.example** to **.env** and fill out FRONTEND_USERNAME and FRONTEND_PASSWORD or use existing .env (I only committed this because this is an example program, wouldn't do this in test or prod)
3. *docker-compose up -d* in this directory to spin up a Postgres instance.
4. *yarn* - installs packages
5. *yarn db:init* - initializes db
6. *yarn start* - starts backend

Server is up. Generate JWT from test data (although the JWT is already in the frontend for your convenience)

1. Open Postman and run `POST /login`. username/password credentials should match by default. JWT is in response body. Feel free to store JWT in Postman's JWT environmental variable for seamless integration into other methods.

## IPFS Proxy

1. Once you generate a new token (or use default token) with Postman or the frontend, put the token into the custom header in Postman's "IPFS HTTP API" entry. Change as desired to verify it works properly.

## API

POST: `/login` - query params { username: string, password: string }; returns API management token (JWT)

GET `/key` - return all keys with their IDs; protected w Bearer JWT

GET `/key:id` - return key from ID; protected w Bearer JWT

GET `/key/:id/requests` - return all the requests under a key id; protected w Bearer JWT

GET `/requests` - return all requests; protected w Bearer JWT

POST: `/key` - create new key; returns { id: string, key: string }; protected w Bearer JWT

DELETE: `/key/:id` - delete key at that ID; protected w Bearer JWT

ANY: `/api/v0/*` - functions just like IPFS HTTP API, and forwards request to one; protected with API key.

## Optimizations and Notes

1. For logging and performance purposes, it would make more sense to use a JWT to secure the proxy endpoints instead of a random 128-bit string. This turns our query to check if an API key is valid from O(log(n)) to O(1) (assuming we have lots of API keys we're issuing).
2. In addition, it would be faster to cache the keys locally or use something like Redis instead of a full SQL database since our most common DB action is to check if a key exists in a DB.
3. Tables could be normalized (requestCount and totalBytesTransfered can be computed from the key's individual entries in the Request table).
4. Multiple username/password combinations could be put in a database with associations to the corrospoinding API keys instead of just one hardcoded 'admin' login credentials.
5. Current function is to delete API Keys from the DB; they should not be deleted, but rather disabled (disabling is a higher priority than deletion).
6. TESTING: I decided to focus on feature work instead of doing tests. At the least, I would have done E2E tests with Chai or some HTTP-level testing framework, and probably some controller-level tests as well.
7. Deeper URL sanitization. For example, if I call GET /keys/randomString or DELETE /keys/-4 it doesn't return an error like it should.

# How would you improve this assignment for a production ready solution?

1. Security is pretty locked down. In order to invalidate JWT tokens, but also to not have to require a DB call to authenticate the token, we can stick a token 'version' in the token body. Only downside is if a token gets comporomised, we have to revolk all tokens (by bumping the version number) and force everyone to login (which would be uncommon).
2. Containerization and CI/CD.
3. Meaningful Git messages

# Describe IPFS and compare it to other protocols e.g., HTTP?

From Wikipedia: The InterPlanetary File System is a protocol and peer-to-peer network for storing and sharing data in a distributed file system. IPFS uses content-addressing to uniquely identify each file in a global namespace connecting all computing devicesIt's data is stored and queried via the content's hash.

---

Since the data is hash addressed, we get some cool properties. For example, data duplication doesn't happen, because the same piece of data, wherever it is, has the same hash. Under the hood, IPFS uses DHTs for peer and content discovery, and uses some faster protocols than TCP, like QUIC. Peers keep track of other peers by using a system called 'bitswap' to keep track of which peers are 'leeching' or consuming content at much higher rates than other peers.

IPFS is very similar to Bittorrent, another P2P protocol (also uses DHTs, hash addressed data, etc), but supports some higher level protocols and peer routing optimizations that offer new properties in modern systems. For example, IPFS has a HTTP gateway that allows sites to be loaded via IPFS and presented to the browser via HTTP. This allows sites to be censorship resistant and takes load off of one server (P2P systems only have peers, no client/server roles).

HTTP is a data transfer protocol, and totally seperate from IPFS (other than IPFS integrating it, since HTTP is totally agnostic of anything below it's application layer). Tying IPFS into HTTP was a great idea, because now we can take advantage of IPFS transparently by using the IPFS browser plugin or browsers that support IPFS natively (Brave).
