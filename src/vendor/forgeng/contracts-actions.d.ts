/** Minimalni tipovi forgeng/contracts/actions za templejt. */
export declare const controls: {
  key(code: string): string;
  pointerButton(index: number): string;
};

export declare const binding: {
  vector2(input: {
    id?: string;
    up: string;
    down: string;
    left: string;
    right: string;
  }): unknown;
  control(control: string): unknown;
};

export declare function defineActionMap(input: {
  id: string;
  actions: Record<
    string,
    {
      kind: "vector2" | "button";
      bindings: readonly unknown[];
    }
  >;
}): {
  id: string;
  move?: unknown;
  action?: unknown;
  interact?: unknown;
  toggle?: unknown;
};
