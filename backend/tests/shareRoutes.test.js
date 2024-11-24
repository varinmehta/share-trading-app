const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect("mongodb://localhost:27017/test_share_trading", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("Share Trading API Tests", () => {
    it("should fetch all shares (GET /api/shares)", async () => {
        const res = await request(app).get("/api/shares");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should allow buying shares (POST /api/shares/buy)", async () => {
        const shareData = { name: "Test Share", price: 100, quantity: 10 };

        const res = await request(app).post("/api/shares/buy").send(shareData);

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(shareData.name);
    });

    it("should allow selling shares (POST /api/shares/sell)", async () => {
        const buyRes = await request(app)
            .post("/api/shares/buy")
            .send({ name: "Sell Share", price: 50, quantity: 20 });

        const sellRes = await request(app)
            .post("/api/shares/sell")
            .send({ id: buyRes.body._id, quantity: 10 });

        expect(sellRes.statusCode).toBe(200);
        expect(sellRes.body.quantity).toBe(10); // Remaining quantity
    });
});
