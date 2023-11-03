import expect from 'expect';
import { Suggestion } from '../controllers'

describe('Test /suggest', () => {
  describe('Response check on day 5 (Friday in 2024)', () => {
    it('suggestion calculation should be okay', async () => {
      let actualResult: any = await Suggestion.getSuggetedDishes('5');
      actualResult = JSON.stringify(actualResult[0]);
      expect(actualResult).toBe('{"name":"Veggie Couscous","ingredients":["Semolina","Potatoe","Carrot","Onion","Tomato paste"],"cooktime":"124 minutes before Asr"}');
    });
  });
});