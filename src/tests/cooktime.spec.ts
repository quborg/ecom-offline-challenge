import expect from 'expect';
import { Cooktime } from '../controllers'

describe('Test /cooktime', () => {
  describe('Response check on day 5 (Friday in 2024) and carrot as ingredient', () => {
    it('cooktime calculation should be okay', async (done) => {
      const actualResult = await Cooktime.getCooktimeDishes('5', 'carrot');
      expect([actualResult[0]]).toBe([{
        "name": "Veggie Couscous",
        "ingredients": [
          "Semolina",
          "Potatoe",
          "Carrot",
          "Onion",
          "Tomato paste"
        ],
        "cooktime": "30 minutes before Asr"
      }]);
      done();
    });
  });
});