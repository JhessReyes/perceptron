<script>
  // @ts-nocheck

  import { Label, Input, Button, Card, Toast } from "flowbite-svelte";
  import { revaluateW } from "../perceptron";
  import { slide } from "svelte/transition";

  let show = false;
  let x1;
  let x2;
  let x3;
  let result;
  let counter;

  /**
   * @param {number[]} inputs
   * @param {number[]} weight
   */
  function predict(inputs, weight) {
    let neti = weight[0];
    for (let i = 0; i < inputs.length; i++) {
      neti += inputs[i] * weight[i + 1];
    }
    return neti >= 0 ? 1 : 0;
  }

  /**
   * @param {{ x: number[]; out: number; }[]} trainingData
   * @param {number[]} weight
   */
  function train(trainingData, weight) {
    let trained = false;
    let err;
    while (!trained) {
      trained = true;
      trainingData.forEach((data) => {
        const output = predict(data.x, weight);

        err = data.out - output;
        if (err != 0) {
          trained = false;
          weight = revaluateW(err, weight, [1, ...data.x]);
        }
      });
    }
    return weight;
  }

  // Ejemplo de uso
  const trainingData = [
    { x: [0, 0, 0], out: 0 },
    { x: [0, 0, 1], out: 0 },
    { x: [0, 1, 1], out: 1 },
    { x: [1, 1, 1], out: 1 },
    { x: [1, 1, 0], out: 1 },
    { x: [1, 0, 0], out: 0 },
    { x: [0, 0, 0], out: 0 },
  ];
  const numInputs = trainingData[0].x.length;
  const weight = train(trainingData, Array(numInputs + 1).fill(0));

  function showResult() {
    show = true;
    counter = 10;
    result = predict([x1, x2, x3], weight);
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
      <h1 class="flex justify-center">Perceptron con N entradas</h1>
      <div class="grid grid-cols-3 gap-4 py-8">
        <div>
          <Label for="default-input" class="block mb-2">{"x1"}</Label>
          <Input
            id="default-input"
            placeholder={"x1"}
            type="number"
            bind:value={x1}
          />
        </div>
        <div>
          <Label for="default-input" class="block mb-2">{"x2"}</Label>
          <Input
            id="default-input"
            placeholder={"x2"}
            type="number"
            bind:value={x2}
          />
        </div>
        <div>
          <Label for="default-input" class="block mb-2">{"x3"}</Label>
          <Input
            id="default-input"
            placeholder={"x3"}
            type="number"
            bind:value={x3}
          />
        </div>
      </div>
      <div class="flex w-full justify-center gap-8">
        <Button on:click={() => showResult()}>Evaluar</Button>
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
