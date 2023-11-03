import expect from 'expect';
import { Cooktime } from '../controllers';

describe('Test /cooktime', () => {
  describe('Response check on day 5 (Friday in 2024) and carrot as ingredient', () => {
    it('cooktime calculation should be okay', async () => {
      let actualResult: any = await Cooktime.getCooktimeDishes('5', 'carrot');
      actualResult = JSON.stringify(actualResult[0]);
      expect(actualResult).toBe('{"name":"Veggie Couscous","ingredients":["Semolina","Potatoe","Carrot","Onion","Tomato paste"],"cooktime":"124 minutes before Asr"}');
    });
  });
});