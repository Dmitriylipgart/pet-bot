import { AutoMap } from '@automapper/classes';

export class Pet {
  private _id: number;
  private _name: string;
  private _fullness: number;
  private _mood: number;
  private _walk: number;
  private _health: number;

  static FULLNESS = {
    PROBLEM: 3,
    NOT_OK: 7,
    MAX: 10,
  };
  static WALK = {
    PROBLEM: 3,
    NOT_OK: 7,
    MAX: 10,
  };
  static MOOD = {
    PROBLEM: 3,
    NOT_OK: 7,
    MAX: 10,
  };
  static HEALTH = {
    PROBLEM: 3,
    NOT_OK: 7,
    MAX: 10,
  };

  @AutoMap()
  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  @AutoMap()
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @AutoMap()
  get fullness(): number {
    return this._fullness;
  }

  set fullness(value: number) {
    this._fullness = value;
  }

  @AutoMap()
  get mood(): number {
    return this._mood;
  }

  set mood(value: number) {
    this._mood = value;
  }

  @AutoMap()
  get walk(): number {
    return this._walk;
  }

  set walk(value: number) {
    this._walk = value;
  }

  @AutoMap()
  get health(): number {
    return this._health;
  }

  set health(value: number) {
    this._health = value;
  }

  private decrease(name: string, value = 1): void {
    if (this[`_${name}`] > 0) {
      this[`_${name}`] = this[`_${name}`] - value;
    }
  }

  private increase(name: string) {
    if (this[`_${name}`] < 10) {
      this[`_${name}`] = this[`_${name}`] + 1;
    }
  }

  public isStarving() {
    return this._fullness <= Pet.FULLNESS.PROBLEM;
  }

  public isFull() {
    return this._fullness > Pet.FULLNESS.NOT_OK;
  }

  public isSick() {
    return this._health <= Pet.HEALTH.PROBLEM;
  }

  public isSad() {
    return this._mood <= Pet.MOOD.PROBLEM;
  }

  public needsToWalk() {
    return this._walk <= Pet.WALK.PROBLEM;
  }

  public isAlive() {
    return this._health > 0;
  }

  public updateStatus() {
    this.decreaseFullness();
    this.decreaseMood();
    this.decreaseWalk();
    this.decreaseHealth();
  }

  private decreaseFullness() {
    this.decrease('fullness');
  }

  private decreaseMood() {
    if (this._mood > 0) {
      this.decrease('mood');
      if (this.isStarving()) this.decrease('mood');
      if (this._walk === Pet.WALK.PROBLEM) this.decrease('mood');
    }
  }

  private decreaseWalk() {
    this.decrease('walk', 2);
  }

  private decreaseHealth() {
    if (this.health > 0) {
      if (
        this._fullness <= Pet.FULLNESS.PROBLEM ||
        this._walk <= Pet.WALK.PROBLEM
      )
        this.decrease('health');
    }
  }

  public increaseFullNess() {
    this._fullness = Pet.FULLNESS.MAX;
    this.increase('mood');
  }

  public increaseMood() {
    this._mood = Pet.MOOD.MAX;
  }

  public increaseWalk() {
    this._walk = Pet.WALK.MAX;
    this.increase('mood');
  }

  public increaseHealth() {
    this._health = Pet.HEALTH.MAX;
  }
}
