import expect from 'expect';
import { Suggestion } from '../controllers'

describe('Test /suggest', () => {
  describe('Response check on day 5 (Friday in 2024)', () => {
    it('suggestion calculation should be okay', async (done) => {
      const actualResult = await Suggestion.getSuggetedDishes('5');
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