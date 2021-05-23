const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
  console.error(error);
});

client.set("user_id:1", JSON.stringify({ user: 'username' }), redis.print);
client.set("book_id:1", JSON.stringify({ title: 'my book' }), redis.print);
client.get("user_id:1", redis.print);
client.get("book_id:1", redis.print);
client.get("unknown key", redis.print);
