const mongoose = require("mongoose");
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://alannuarii:Al4n1234@cluster0.0fwme.mongodb.net/kotamobagu?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
