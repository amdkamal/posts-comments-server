a webserver with two endpoints:

1. POST endpoint that takes a post ID, fetches the post with the requested ID and corresponding comments then store them in the database appropriately.
2. GET endpoint that fetches a post given the ID, the post includes up to 3 comments ordered by biggest in characters size. The endpoint should return the posts and comments as a property of post.
