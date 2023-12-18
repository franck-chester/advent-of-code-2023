export type Step = {
  x: number;
  y: number;
  direction: number;
};

export function stepId(step:Step) : string{
  return `${step.x},${step.y},${step.direction}`;
}

export class Path extends Array<Step> {

  private stepIds: Set<string>;

  constructor(...items: Step[]) {
    super(...items);
    this.stepIds = new Set<string>();
    items.forEach(item => this.stepIds.add(stepId(item)));

  }

  push(...items: Step[]): number {
    items.forEach(item => this.stepIds.add(stepId(item)));
    return super.push(...items);
  }

  pop(): Step | undefined {
    const popped = super.pop();
    if (popped !== undefined) this.stepIds.delete(stepId(popped));
    return popped;
  }

  has(item: Step): boolean {
    return this.stepIds.has(stepId(item));
  }

  clone(): Path {
    // deep copy!
    return new Path(...this.map((step) => {
      return {
        x: step.x,
        y: step.y,
        direction: step.direction
      };
    }));
  }

  // returns true if the new step would cross this path in any direction
  isCrossedBy(newStep: Step): boolean {
    return super.some(previousStep => previousStep.x == newStep.x && previousStep.y == newStep.y);
  }
}


export const enum Direction {
  Right = 0,
  Down,
  Left,
  Up
}
;

export function oppositeDirection(direction: Direction): Direction {
  switch (direction) {
    case Direction.Right: return Direction.Left;
    case Direction.Down: return Direction.Up;
    case Direction.Left: return Direction.Right;
    case Direction.Up: return Direction.Down;
  }
}
