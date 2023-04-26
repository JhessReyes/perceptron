<script>
  /*   // @ts-nocheck
   */
  import { Label, Input, Button, Card, Toast } from "flowbite-svelte";
  import { Neti, revaluateW } from "./perceptron";
  import { slide } from "svelte/transition";
  /*   import type { LogicFunType } from "./perceptron"; */
  let fun = [
    { x1: 0, x2: 0, out: 0 },
    { x1: 0, x2: 1, out: 0 },
    { x1: 1, x2: 0, out: 0 },
    { x1: 1, x2: 1, out: 1 },
  ];

  let weight = [-0.5, 0.5, 1.5];
  let trained = false;
  let neti;
  let counter = 10;
  let show = false;
  let valueX1;
  let valueX2;
  let result = "no definido";

  /**
   * @param {{ x1: number; x2: number; out: number; }[]} logicFun
   * @param {number[]} weight
   */
  function train(logicFun) {
    let sp;
    let err;
    /* let wOut = weight; */
    while (!trained) {
      trained = true;
      logicFun.map((log) => {
        neti = log.x1 * weight[1] + log.x2 * weight[2] + weight[0];

        neti >= 0 ? (sp = 1) : (sp = 0);
        err = log.out - sp;
        if (err != 0) {
          trained = false;
          weight = revaluateW(err, weight, [1, log.x1, log.x2]);
          /* weight = wOut; */
          console.log(weight);
        }
      });
    }
    console.log(weight);
    return weight;
  }

  function trigger() {
    show = true;
    counter = 10;
    console.log(weight);
    result = Neti(valueX1, valueX2, weight) >= 0 ? 1 : 0;
    timeout();
  }

  function timeout() {
    if (--counter > 0) return setTimeout(timeout, 1000);
    show = false;
  }
</script>

<div class="max-w-7xl m-auto p-20 flex justify-center">
  <Card size="xl" class="w-full">
    <div class="mb-6 w">
      <Button on:click={() => train(fun)}>Entrenar</Button>

      <div class="grid grid-cols-2 gap-4 py-8">
        <div>
          <Label for="default-input" class="block mb-2">X1</Label>
          <Input
            id="default-input"
            placeholder="x1"
            type="number"
            bind:value={valueX1}
          />
        </div>
        <div>
          <Label for="default-input" class="block mb-2">X2</Label>
          <Input
            id="default-input"
            placeholder="x2"
            type="number"
            bind:value={valueX2}
          />
        </div>
      </div>
      <div class="flex w-full justify-center gap-8">
        <Button on:click={() => trigger()}>Evaluar</Button>
        <Toast simple transition={slide} bind:open={show}>
          <svelte:fragment slot="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              /></svg
            >
          </svelte:fragment>
          <div class="flex justify-between">
            <span>
              {result}
            </span>
            <span>
              {counter}s.
            </span>
          </div>
        </Toast>
      </div>
    </div>
  </Card>
</div>
