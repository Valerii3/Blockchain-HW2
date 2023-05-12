const PoetryNFT = artifacts.require("PoetryNFT");

contract("PoetryNFT", (accounts) => {
  let poetryNFT;

  beforeEach(async () => {
    poetryNFT = await PoetryNFT.new();
  });

  it("should publish poetry and retrieve it correctly", async () => {
    // Publish a new poetry
    const title = "The Man who laughs";
    const author = "Victor Hugo";
    const text = "I am a symbol. Oh, you all-powerful fools, open your eyes. I represent all. I embody humanity as its masters have made it";
    const tokenId = await poetryNFT.publishPoetry(title, author, text);

   
    const [retrievedTitle, retrievedAuthor, retrievedText] = await poetryNFT.getPoetry(tokenId);

    // Verify the retrieved poetry matches the published one
    assert.equal(retrievedTitle, title, "The retrieved title does not match the published one");
    assert.equal(retrievedAuthor, author, "The retrieved author does not match the published one");
    assert.equal(retrievedText, text, "The retrieved text does not match the published one");
  });

  it("should not retrieve a non-existent poetry", async () => {
    // Attempt to retrieve a non-existent poetry
    const tokenId = 1;
    try {
      await poetryNFT.getPoetry(tokenId);
    } catch (error) {
      assert.include(error.message, "Token does not exist", "The error message is incorrect");
      return;
    }
    assert.fail("The function should have reverted");
  });
});
